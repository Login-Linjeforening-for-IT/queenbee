'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import config from '@config'
import { authentikApiWrapper } from '@utils/apiAuthentik'
import { expandRemoval, isAddable, isRemovable, withAktivOnAdd } from './orgGroups'

export type MembershipResult = { group: string, ok: boolean }

type AuthentikGroup = { pk: string, name: string }

// Caller must belong to one of these to mutate membership. Checked against the
// live userinfo endpoint (not the client-readable user_groups cookie).
const AUTHORIZED_GROUPS = ['styret', 'authentik admins']

async function requireAuthorized(): Promise<void> {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value
    let authorized = false

    if (token) {
        try {
            const response = await fetch(config.authentik.url.userinfo, {
                headers: { Authorization: `Bearer ${token}` },
                signal: AbortSignal.timeout(3000),
            })
            if (response.ok) {
                const data = await response.json()
                const groups: string[] = Array.isArray(data.groups) ? data.groups : []
                const lowerGroups = groups.map(group => group.toLowerCase())
                authorized = AUTHORIZED_GROUPS.some(group => lowerGroups.includes(group))
            }
        } catch {
            authorized = false
        }
    }

    if (!authorized) {
        throw new Error('Not authorized to manage membership')
    }
}

function assertAddable(groups: string[]): void {
    const invalid = groups.filter(group => !isAddable(group))
    if (invalid.length > 0) {
        throw new Error(`Refusing to add non-addable groups: ${invalid.join(', ')}`)
    }
}

function assertRemovable(groups: string[]): void {
    const invalid = groups.filter(group => !isRemovable(group))
    if (invalid.length > 0) {
        throw new Error(`Refusing to remove non-removable groups: ${invalid.join(', ')}`)
    }
}

// name -> pk for every group, so allowlisted names resolve to the UUID the
// membership endpoints expect.
async function resolveGroupIds(): Promise<Map<string, string>> {
    const data = await authentikApiWrapper({
        path: '/core/groups/?page_size=200',
        token: config.authentik.token ?? '',
    })
    const results: AuthentikGroup[] = data?.results ?? []
    return new Map(results.map(group => [group.name, group.pk]))
}

// The writable groups the member currently belongs to (used to cascade the
// committee⟺Aktiv invariant on removal).
async function currentWritableGroups(userPk: number): Promise<string[]> {
    const user = await authentikApiWrapper({
        path: `/core/users/${userPk}/`,
        token: config.authentik.token ?? '',
    })
    const names: string[] = (user?.groups_obj ?? []).map((group: { name: string }) => group.name)
    return names.filter(isRemovable)
}

async function mutateMembership(
    userPk: number,
    groups: string[],
    action: 'add_user' | 'remove_user',
): Promise<MembershipResult[]> {
    // Defense in depth: nothing but allowlisted groups ever leaves the server.
    if (action === 'add_user') assertAddable(groups)
    else assertRemovable(groups)

    if (groups.length === 0) {
        return []
    }

    const groupIds = await resolveGroupIds()
    const results: MembershipResult[] = []

    for (const group of groups) {
        const groupId = groupIds.get(group)
        if (!groupId) {
            results.push({ group, ok: false })
            continue
        }
        try {
            await authentikApiWrapper({
                path: `/core/groups/${groupId}/${action}/`,
                token: config.authentik.token ?? '',
                method: 'POST',
                body: { pk: userPk },
            })
            results.push({ group, ok: true })
        } catch {
            results.push({ group, ok: false })
        }
    }

    revalidatePath('/org/member/[pk]', 'page')
    revalidatePath('/org/chart')
    revalidatePath('/org/directory')

    return results
}

export async function addMember(userPk: number, groups: string[]): Promise<MembershipResult[]> {
    await requireAuthorized()
    assertAddable(groups)
    // Adding a committee always adds Aktiv too.
    return mutateMembership(userPk, withAktivOnAdd(groups), 'add_user')
}

export async function removeMember(userPk: number, groups: string[]): Promise<MembershipResult[]> {
    await requireAuthorized()
    assertRemovable(groups)
    // Cascade the invariant against the member's live membership.
    const current = await currentWritableGroups(userPk)
    return mutateMembership(userPk, expandRemoval(current, groups), 'remove_user')
}

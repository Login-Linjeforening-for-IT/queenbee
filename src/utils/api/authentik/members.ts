'use server'

import config from '@config'
import { authentikApiWrapper, fetchAllPages } from '@utils/apiAuthentik'
import { AKTIV_GROUP, BOARD_GROUP, orgUnitsOf } from './orgGroups'

export type Member = {
    pk: number
    name: string
    username: string
    email: string
    avatar: string | null
    isActive: boolean
    isSuperuser: boolean
    isService: boolean
    lastLogin: string | null
    joined: string | null
    inAktiv: boolean
    isBoard: boolean
    units: string[]
    groups: string[]
}

type AuthentikUser = {
    pk: number
    username: string
    name: string
    email: string
    avatar?: string
    is_active: boolean
    is_superuser?: boolean
    type?: string
    last_login?: string | null
    date_joined?: string
    groups_obj?: { name: string }[]
}

function mapUser(user: AuthentikUser): Member {
    const groups = (user.groups_obj ?? []).map(group => group.name)
    return {
        pk: user.pk,
        name: user.name || user.username,
        username: user.username,
        email: user.email,
        avatar: user.avatar ?? null,
        isActive: user.is_active,
        isSuperuser: Boolean(user.is_superuser),
        isService: user.type === 'service_account',
        lastLogin: user.last_login ?? null,
        joined: user.date_joined ?? null,
        inAktiv: groups.includes(AKTIV_GROUP),
        isBoard: groups.includes(BOARD_GROUP),
        units: orgUnitsOf(groups),
        groups: [...groups].sort(),
    }
}

export async function getMemberDirectory(): Promise<Member[]> {
    const users = await fetchAllPages('/core/users/?page_size=100', config.authentik.token ?? '') as AuthentikUser[]
    return users.map(mapUser).sort((a, b) => a.name.localeCompare(b.name))
}

export async function getMemberProfile(pk: string): Promise<Member | null> {
    let user: AuthentikUser
    try {
        user = await authentikApiWrapper({ path: `/core/users/${pk}/`, token: config.authentik.token ?? '' })
    } catch {
        return null
    }
    return user?.pk ? mapUser(user) : null
}

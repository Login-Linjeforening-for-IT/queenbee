'use server'

import config from '@config'
import { authentikApiWrapper, fetchAllPages } from '@utils/apiAuthentik'
import { AKTIV_GROUP, BOARD_GROUP, COMMITTEE_GROUPS, FONDET_GROUP, HR_GROUP, LEADER_GROUPS } from './orgGroups'

export type OrgMember = {
    pk: number
    name: string
    username: string
    email: string
    joined: string
}

export type OrgUnit = {
    name: string
    members: OrgMember[]
    leaderPks: number[]
}

export type OrgChart = {
    activeCount: number
    board: OrgUnit
    fondet: OrgUnit
    hr: OrgUnit
    committees: OrgUnit[]
}

type AuthentikUser = {
    pk: number
    name: string
    username: string
    email: string
    is_active: boolean
    date_joined?: string
}

type AuthentikGroup = {
    name: string
    users_obj?: AuthentikUser[]
}

async function fetchJoinDates(token: string): Promise<Map<number, string>> {
    const users = await fetchAllPages('/core/users/?page_size=100', token) as AuthentikUser[]
    return new Map(users.filter(user => user?.pk != null).map(user => [user.pk, user.date_joined ?? '']))
}

export default async function getOrgChart(): Promise<OrgChart> {
    const token = config.authentik.token ?? ''

    const [data, joinDates] = await Promise.all([
        authentikApiWrapper({ path: '/core/groups/?page_size=200', token }),
        fetchJoinDates(token),
    ])

    const groups: AuthentikGroup[] = data?.results ?? []
    const byName = new Map(groups.map(group => [group.name, group]))

    const activeIds = new Set(
        (byName.get(AKTIV_GROUP)?.users_obj ?? [])
            .filter(user => user.is_active)
            .map(user => user.pk)
    )

    const memberPks = (name: string): number[] => [
        ...new Set(
            (byName.get(name)?.users_obj ?? [])
                .filter(user => activeIds.has(user.pk))
                .map(user => user.pk)
        ),
    ]

    const buildMembers = (name: string): OrgMember[] =>
        (byName.get(name)?.users_obj ?? [])
            .filter(user => activeIds.has(user.pk))
            .map(user => ({
                pk: user.pk,
                name: user.name || user.username,
                username: user.username,
                email: user.email,
                joined: joinDates.get(user.pk) ?? '',
            }))
            .sort((a, b) => (a.joined || '9999').localeCompare(b.joined || '9999') || a.name.localeCompare(b.name))

    const leadersFirst = (members: OrgMember[], leaderPks: number[]): OrgMember[] => {
        const leaders = new Set(leaderPks)
        return [...members].sort((a, b) => Number(leaders.has(b.pk)) - Number(leaders.has(a.pk)))
    }

    const boardPks = new Set(memberPks(BOARD_GROUP))
    const orgLeaderPks = new Set(LEADER_GROUPS.flatMap(memberPks))

    const boardLeaderPks = memberPks(BOARD_GROUP).filter(pk => orgLeaderPks.has(pk))
    const board: OrgUnit = {
        name: BOARD_GROUP,
        members: leadersFirst(buildMembers(BOARD_GROUP), boardLeaderPks),
        leaderPks: boardLeaderPks,
    }

    const committees: OrgUnit[] = COMMITTEE_GROUPS.map(name => {
        const members = buildMembers(name)
        const boardInCommittee = members.map(m => m.pk).filter(pk => boardPks.has(pk))
        const withoutOrgLeaders = boardInCommittee.filter(pk => !orgLeaderPks.has(pk))
        const leaderPks = withoutOrgLeaders.length > 0 ? withoutOrgLeaders : boardInCommittee
        return {
            name,
            members: leadersFirst(members, leaderPks),
            leaderPks,
        }
    })

    return {
        activeCount: activeIds.size,
        board,
        fondet: { name: FONDET_GROUP, members: buildMembers(FONDET_GROUP), leaderPks: [] },
        hr: { name: HR_GROUP, members: buildMembers(HR_GROUP), leaderPks: [] },
        committees,
    }
}

'use server'

import config from '@config'
import { authentikApiWrapper } from '@utils/apiAuthentik'
import { AKTIV_GROUP, BOARD_GROUP, COMMITTEE_GROUPS, ORG_UNIT_GROUPS } from './orgGroups'

export type ReportMember = {
    pk: number
    name: string
    username: string
    email: string
    lastLogin: string | null
    units: string[]
}

export type MemberReport = {
    generatedAt: string
    activeCount: number
    dormantMonths: number
    notInAktiv: ReportMember[]
    unplacedActive: ReportMember[]
    dormant: ReportMember[]
    inactiveAccounts: ReportMember[]
    committeesWithoutLeader: string[]
    emptyUnits: string[]
}

const DORMANT_MONTHS = 6

type AuthentikUser = {
    pk: number
    name: string
    username: string
    email: string
    is_active: boolean
    last_login?: string | null
}

type AuthentikGroup = {
    name: string
    users_obj?: AuthentikUser[]
}

export default async function getMemberReport(): Promise<MemberReport> {
    const data = await authentikApiWrapper({
        path: '/core/groups/?page_size=200',
        token: config.authentik.token ?? '',
    })

    const groups: AuthentikGroup[] = data?.results ?? []
    const byName = new Map(groups.map(group => [group.name, group]))
    const usersOf = (name: string) => byName.get(name)?.users_obj ?? []

    const aktivIds = new Set(usersOf(AKTIV_GROUP).map(user => user.pk))
    const boardIds = new Set(usersOf(BOARD_GROUP).map(user => user.pk))

    // Build one record per person across the whole member universe.
    type Record = { user: AuthentikUser, units: Set<string> }
    const people = new Map<number, Record>()
    const track = (name: string) => {
        for (const user of usersOf(name)) {
            const existing = people.get(user.pk)
            if (existing) existing.units.add(name)
            else people.set(user.pk, { user, units: new Set([name]) })
        }
    }
    ORG_UNIT_GROUPS.forEach(track)
    track(AKTIV_GROUP)

    const toMember = (record: Record): ReportMember => ({
        pk: record.user.pk,
        name: record.user.name || record.user.username,
        username: record.user.username,
        email: record.user.email,
        lastLogin: record.user.last_login ?? null,
        units: [...record.units].filter(unit => unit !== AKTIV_GROUP).sort(),
    })

    const dormantCutoff = Date.now() - DORMANT_MONTHS * 30 * 24 * 60 * 60 * 1000
    const isDormant = (user: AuthentikUser) =>
        !user.last_login || new Date(user.last_login).getTime() < dormantCutoff

    const notInAktiv: ReportMember[] = []
    const unplacedActive: ReportMember[] = []
    const dormant: ReportMember[] = []
    const inactiveAccounts: ReportMember[] = []

    for (const record of people.values()) {
        const { user, units } = record
        const inUnit = [...units].some(unit => unit !== AKTIV_GROUP)
        const inAktiv = aktivIds.has(user.pk)

        if (!user.is_active) inactiveAccounts.push(toMember(record))
        if (inUnit && !inAktiv) notInAktiv.push(toMember(record))
        if (inAktiv && !inUnit) unplacedActive.push(toMember(record))
        if (inAktiv && user.is_active && isDormant(user)) dormant.push(toMember(record))
    }

    const byName2 = (a: ReportMember, b: ReportMember) => a.name.localeCompare(b.name)
    notInAktiv.sort(byName2)
    unplacedActive.sort(byName2)
    inactiveAccounts.sort(byName2)
    dormant.sort((a, b) => (a.lastLogin ?? '').localeCompare(b.lastLogin ?? ''))

    const committeesWithoutLeader = COMMITTEE_GROUPS.filter(
        name => !usersOf(name).some(user => boardIds.has(user.pk))
    )
    const emptyUnits = ORG_UNIT_GROUPS.filter(name => usersOf(name).length === 0)

    return {
        generatedAt: new Date().toISOString(),
        activeCount: aktivIds.size,
        dormantMonths: DORMANT_MONTHS,
        notInAktiv,
        unplacedActive,
        dormant,
        inactiveAccounts,
        committeesWithoutLeader,
        emptyUnits,
    }
}

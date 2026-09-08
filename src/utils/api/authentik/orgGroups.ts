// Group names in Authentik that represent org units a member can belong to.
export const AKTIV_GROUP = 'Aktiv'
export const BOARD_GROUP = 'Styret'
export const DEPUTY_GROUP = 'Nestleder'
export const QUEENBEE_GROUP = 'QueenBee'
export const LEADER_GROUPS = ['Leder', 'Nestleder']
export const COMMITTEE_GROUPS = ['TekKom', 'EvntKom', 'PR', 'BarKom', 'BedKom', 'CTFkom', 'SATkom']
export const FONDET_GROUP = 'Fondet'
export const HR_GROUP = 'HR'
export const STANDALONE_GROUPS = [FONDET_GROUP, HR_GROUP]

// Extra roles the onboard/offboard wizard can grant beyond committees. These sit
// outside the committee to Aktiv invariant, so they are added/removed exactly as
// selected, nothing cascades.
export const ROLE_GROUPS = [QUEENBEE_GROUP]

export const ORG_UNIT_GROUPS = [
    BOARD_GROUP,
    ...LEADER_GROUPS,
    ...COMMITTEE_GROUPS,
    ...STANDALONE_GROUPS,
]

// Groups the AUTHENTIK_API_TOKEN role may ADD a member to (onboard).
export const ADDABLE_GROUPS = [AKTIV_GROUP, ...COMMITTEE_GROUPS, ...ROLE_GROUPS]

// Board roles the app may REMOVE (offboard) but must never add. Membership is
// granted by hand in Authentik, only revocation is automated here.
export const REMOVE_ONLY_GROUPS = [BOARD_GROUP, DEPUTY_GROUP]

// Everything the app may remove a member from.
export const REMOVABLE_GROUPS = [...ADDABLE_GROUPS, ...REMOVE_ONLY_GROUPS]

// Both allowlists mirror the object-level permissions granted in Authentik; any
// other group is rejected before a request is made (defense in depth: Authentik
// itself returns 403 for non-allowlisted groups).
const ADDABLE_GROUP_SET = new Set(ADDABLE_GROUPS)
const REMOVABLE_GROUP_SET = new Set(REMOVABLE_GROUPS)
const COMMITTEE_SET = new Set(COMMITTEE_GROUPS)

export function isAddable(name: string): boolean {
    return ADDABLE_GROUP_SET.has(name)
}

export function isRemovable(name: string): boolean {
    return REMOVABLE_GROUP_SET.has(name)
}

export function isCommittee(name: string): boolean {
    return COMMITTEE_SET.has(name)
}

// Invariant: committee membership implies Aktiv membership.
// Adding any committee also adds the member to Aktiv.
export function withAktivOnAdd(groups: string[]): string[] {
    const result = new Set(groups)
    if (groups.some(isCommittee)) {
        result.add(AKTIV_GROUP)
    }
    return [...result]
}

// The same invariant cascades on removal: removing Aktiv drops every
// committee, and removing a member's last committee also drops Aktiv.
// Returns the writable groups that should actually be removed, given the
// member's current groups.
export function expandRemoval(current: string[], removing: string[]): string[] {
    const currentSet = new Set(current)
    const toRemove = new Set(removing)

    if (toRemove.has(AKTIV_GROUP)) {
        for (const name of currentSet) {
            if (isCommittee(name)) {
                toRemove.add(name)
            }
        }
    }

    // Dropping a member's last committee also drops Aktiv. Only cascade when a
    // committee is actually being removed. Removing a standalone role (Styret,
    // Nestleder, Queenbee) must never touch Aktiv.
    if ([...toRemove].some(isCommittee)) {
        const remainingCommittees = [...currentSet].filter(name => isCommittee(name) && !toRemove.has(name))
        if (remainingCommittees.length === 0) {
            toRemove.add(AKTIV_GROUP)
        }
    }

    return [...toRemove].filter(name => currentSet.has(name) && isRemovable(name))
}

const ORG_UNIT_SET = new Set(ORG_UNIT_GROUPS)

export function orgUnitsOf(groupNames: string[]): string[] {
    return groupNames.filter(name => ORG_UNIT_SET.has(name)).sort()
}

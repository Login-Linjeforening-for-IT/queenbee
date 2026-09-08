'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Boxes, Check, KeyRound, MessageSquare, UserMinus, UserPlus, X } from 'lucide-react'
import { Alert, Badge, Button, Card, IconBubble, Modal, toast } from 'uibee/components'
import {
    AKTIV_GROUP,
    COMMITTEE_GROUPS,
    REMOVABLE_GROUPS,
    ROLE_GROUPS,
    expandRemoval,
    withAktivOnAdd,
} from '@utils/api/authentik/orgGroups'
import { addMember, removeMember, type MembershipResult } from '@utils/api/authentik/setMembership'

type MembershipPanelProps = {
    pk: number
    name: string
    groups: string[]
}

type Flow = 'onboard' | 'offboard'

// Manual, out-of-band access that lives outside Authentik and SSO. The app never
// touches these, so the operator ticks each one to confirm they handled it before
// the group changes go through.
type ExternalItem = {
    id: string
    label: string
    icon: typeof KeyRound
    add: string
    remove: string
}

const EXTERNAL_ITEMS: ExternalItem[] = [
    {
        id: '1password',
        label: '1Password',
        icon: KeyRound,
        add: 'Added the member to the relevant 1Password vaults.',
        remove: 'Removed the member from every 1Password vault.',
    },
    {
        id: 'discord',
        label: 'Discord role',
        icon: MessageSquare,
        add: 'Assigned the member their Discord roles.',
        remove: 'Removed the member from their Discord roles.',
    },
    {
        id: 'other',
        label: 'Other non-SSO apps',
        icon: Boxes,
        add: 'Handled access to any other non-SSO apps the member uses.',
        remove: 'Revoked access to any other non-SSO apps the member used.',
    },
]

const MANAGED_GROUPS = new Set(REMOVABLE_GROUPS)

function firstFailure(results: MembershipResult[]): string[] {
    return results.filter(result => !result.ok).map(result => result.group)
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return <span className='text-[10px] font-semibold uppercase tracking-wider text-login-300'>{children}</span>
}

function Stepper({ step, labels }: { step: number, labels: string[] }) {
    return (
        <div className='flex items-center gap-2'>
            {labels.map((label, index) => (
                <div key={label} className='flex items-center gap-2'>
                    <span className={`
                        flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
                        ${index <= step ? 'bg-login text-login-900' : 'bg-login-600 text-login-200'}
                    `}>
                        {index + 1}
                    </span>
                    <span className={`text-xs ${index === step ? 'text-login-50' : 'text-login-300'}`}>{label}</span>
                    {index < labels.length - 1 && <span className='h-px w-5 bg-login-600' />}
                </div>
            ))}
        </div>
    )
}

function CheckBox({ checked }: { checked: boolean }) {
    return (
        <span className={`
            flex h-4 w-4 min-w-4 items-center justify-center rounded border transition-colors
            ${checked ? 'border-login bg-login text-login-900' : 'border-login-500'}
        `}>
            {checked && <Check className='h-3 w-3' />}
        </span>
    )
}

function RemovableChip({ label, busy, onRemove }: { label: string, busy: boolean, onRemove: () => void }) {
    return (
        <span className='flex items-center gap-1 rounded-full bg-login/15 py-0.5 pl-2.5 pr-1 text-xs font-medium text-login'>
            {label}
            <button
                type='button'
                aria-label={`Remove from ${label}`}
                disabled={busy}
                onClick={onRemove}
                className={`
                    flex h-4 w-4 items-center justify-center rounded-full text-login
                    transition-colors hover:bg-login/20 disabled:opacity-50
                `}
            >
                <X className='h-3 w-3' />
            </button>
        </span>
    )
}

function ChipSection({ label, groups, empty, hint, busy, onRemove }: {
    label: string
    groups: string[]
    empty: string
    hint: string
    busy: boolean
    onRemove: (group: string) => void
}) {
    return (
        <div className='flex flex-col gap-2'>
            <FieldLabel>{label}</FieldLabel>
            {groups.length === 0 ? (
                <span className='text-sm text-login-300'>{empty}</span>
            ) : (
                <div className='flex flex-wrap gap-1.5'>
                    {groups.map(group => (
                        <RemovableChip key={group} label={group} busy={busy} onRemove={() => onRemove(group)} />
                    ))}
                </div>
            )}
            <span className='text-xs text-login-400'>{hint}</span>
        </div>
    )
}

function SelectTile({ label, checked, onClick }: { label: string, checked: boolean, onClick: () => void }) {
    return (
        <button
            type='button'
            onClick={onClick}
            className={`
                flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-colors
                ${checked
            ? 'border-login/60 bg-login/10 text-login-50'
            : 'border-login-500/30 bg-login-500/50 text-login-200 hover:border-login-500'}
            `}
        >
            {label}
            <CheckBox checked={checked} />
        </button>
    )
}

// Gated checklist shared by both wizards. Every item must be ticked before the
// flow can continue, so nobody forgets the manual, non-SSO access.
function ExternalChecklist({ flow, checked, onToggle }: {
    flow: Flow
    checked: Set<string>
    onToggle: (id: string) => void
}) {
    return (
        <div className='flex flex-col gap-3'>
            <p className='text-sm text-login-200'>
                {flow === 'onboard'
                    ? 'Confirm the access that lives outside SSO has been granted.'
                    : 'Confirm the access that lives outside SSO has been revoked.'}
            </p>
            <div className='flex flex-col gap-2'>
                {EXTERNAL_ITEMS.map((item) => {
                    const isChecked = checked.has(item.id)
                    return (
                        <button
                            key={item.id}
                            type='button'
                            onClick={() => onToggle(item.id)}
                            className={`
                                flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors
                                ${isChecked
                            ? 'border-login/60 bg-login/10'
                            : 'border-login-500/30 bg-login-500/50 hover:border-login-500'}
                            `}
                        >
                            <IconBubble icon={item.icon} tone={isChecked ? 'orange' : 'slate'} size='sm' />
                            <span className='flex min-w-0 flex-1 flex-col'>
                                <span className='text-sm font-medium text-login-50'>{item.label}</span>
                                <span className='text-xs text-login-300'>
                                    {flow === 'onboard' ? item.add : item.remove}
                                </span>
                            </span>
                            <CheckBox checked={isChecked} />
                        </button>
                    )
                })}
            </div>
            <span className='text-xs text-login-400'>Tick every item to continue.</span>
        </div>
    )
}

function SelectGroup({ label, options, selected, onToggle }: {
    label: string
    options: string[]
    selected: Set<string>
    onToggle: (group: string) => void
}) {
    if (options.length === 0) return null
    return (
        <div className='flex flex-col gap-2'>
            <FieldLabel>{label}</FieldLabel>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                {options.map(group => (
                    <SelectTile key={group} label={group} checked={selected.has(group)} onClick={() => onToggle(group)} />
                ))}
            </div>
        </div>
    )
}

// One wizard drives both onboard and offboard: a stepper, the active step's
// body, and a Back/Next footer that turns into the final action on the last step.
function Wizard({ open, title, labels, step, setStep, steps, canAdvance, variant, finalLabel, onConfirm, onClose, busy }: {
    open: boolean
    title: string
    labels: string[]
    step: number
    setStep: (n: number) => void
    steps: React.ReactNode[]
    canAdvance: boolean[]
    variant: 'primary' | 'danger'
    finalLabel: string
    onConfirm: () => void
    onClose: () => void
    busy: boolean
}) {
    const last = labels.length - 1
    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={title}
            footer={
                <div className='flex justify-end gap-2'>
                    <Button
                        text={step === 0 ? 'Cancel' : 'Back'}
                        variant='secondary'
                        disabled={busy}
                        onClick={step === 0 ? onClose : () => setStep(step - 1)}
                    />
                    <Button
                        text={step === last ? finalLabel : 'Next'}
                        variant={variant}
                        disabled={busy || !canAdvance[step]}
                        onClick={step === last ? onConfirm : () => setStep(step + 1)}
                    />
                </div>
            }
        >
            <div className='flex flex-col gap-4'>
                <Stepper step={step} labels={labels} />
                {steps[step]}
            </div>
        </Modal>
    )
}

export default function MembershipPanel({ pk, name, groups }: MembershipPanelProps) {
    const router = useRouter()
    const [membership, setMembership] = useState<Set<string>>(
        () => new Set(groups.filter(group => MANAGED_GROUPS.has(group))),
    )
    const [flow, setFlow] = useState<Flow | null>(null)
    const [step, setStep] = useState(0)
    const [selected, setSelected] = useState<Set<string>>(() => new Set())
    const [checklist, setChecklist] = useState<Set<string>>(() => new Set())
    const [busy, setBusy] = useState(false)
    const [, startTransition] = useTransition()

    const isAktiv = membership.has(AKTIV_GROUP)
    const activeCommittees = COMMITTEE_GROUPS.filter(group => membership.has(group))
    const availableCommittees = COMMITTEE_GROUPS.filter(group => !membership.has(group))
    // Roles shown as removable chips: every managed group that is not a committee
    // or Aktiv (QueenBee, plus the remove-only board roles Styret and Nestleder).
    const activeRoles = [...membership]
        .filter(group => group !== AKTIV_GROUP && !COMMITTEE_GROUPS.includes(group))
        .sort()
    // Only these can be added during onboarding; board roles are remove-only.
    const availableRoles = ROLE_GROUPS.filter(group => !membership.has(group))
    const currentWritable = [...membership]
    const checklistComplete = EXTERNAL_ITEMS.every(item => checklist.has(item.id))

    function closeFlow() {
        setFlow(null)
        setStep(0)
        setSelected(new Set())
        setChecklist(new Set())
    }

    function openOnboard() {
        setSelected(new Set())
        setChecklist(new Set())
        setStep(0)
        setFlow('onboard')
    }

    function openOffboard() {
        setChecklist(new Set())
        setStep(0)
        setFlow('offboard')
    }

    function toggleSelected(group: string) {
        setSelected((prev) => {
            const next = new Set(prev)
            if (next.has(group)) next.delete(group)
            else next.add(group)
            return next
        })
    }

    function toggleChecklist(id: string) {
        setChecklist((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    // Runs a mutation, syncs local state to the derived result, and refreshes.
    async function run(action: () => Promise<MembershipResult[]>, nextMembership: Set<string>, successMessage: string) {
        setBusy(true)
        try {
            const results = await action()
            const failed = firstFailure(results)
            if (failed.length > 0) {
                toast.error(`Failed for: ${failed.join(', ')}`)
                return false
            }
            setMembership(nextMembership)
            startTransition(() => router.refresh())
            toast.success(successMessage)
            return true
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Membership update failed')
            return false
        } finally {
            setBusy(false)
        }
    }

    async function confirmOnboard() {
        const additions = withAktivOnAdd([...selected])
        const next = new Set([...membership, ...additions])
        const ok = await run(() => addMember(pk, [...selected]), next, `Onboarded ${name}`)
        if (ok) closeFlow()
    }

    async function confirmOffboard() {
        const ok = await run(() => removeMember(pk, currentWritable), new Set(), `Offboarded ${name}`)
        if (ok) closeFlow()
    }

    async function removeGroup(group: string) {
        const removed = expandRemoval(currentWritable, [group])
        const next = new Set([...membership].filter(item => !removed.includes(item)))
        await run(() => removeMember(pk, [group]), next, `Removed from ${removed.join(', ')}`)
    }

    const onboardAdditions = withAktivOnAdd([...selected]).filter(group => !membership.has(group))
    const hasSomethingToAdd = availableCommittees.length > 0 || availableRoles.length > 0

    return (
        <Card className='flex flex-col gap-5 p-5'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <span className='text-xs font-semibold uppercase tracking-wider text-login-300'>Membership</span>
                {membership.size === 0 ? (
                    <Button
                        text='Onboard'
                        icon={<UserPlus className='h-4 w-4' />}
                        variant='primary'
                        disabled={busy || !hasSomethingToAdd}
                        onClick={openOnboard}
                    />
                ) : (
                    <Button
                        text='Offboard'
                        icon={<UserMinus className='h-4 w-4' />}
                        variant='danger'
                        disabled={busy}
                        onClick={openOffboard}
                    />
                )}
            </div>

            <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-3'>
                    <FieldLabel>Active member</FieldLabel>
                    <Badge text={isAktiv ? 'Aktiv' : 'Not active'} variant={isAktiv ? 'orange' : 'default'} />
                </div>

                <ChipSection
                    label='Committees'
                    groups={activeCommittees}
                    empty='Not in any committee.'
                    hint='Committee members are always in Aktiv.'
                    busy={busy}
                    onRemove={removeGroup}
                />

                <ChipSection
                    label='Roles'
                    groups={activeRoles}
                    empty='No app roles.'
                    hint='QueenBee can be added here; Styret and Nestleder can only be removed.'
                    busy={busy}
                    onRemove={removeGroup}
                />
            </div>

            <Wizard
                open={flow === 'onboard'}
                title={`Onboard ${name}`}
                labels={['Groups', 'External access', 'Review']}
                step={step}
                setStep={setStep}
                variant='primary'
                finalLabel='Confirm'
                onConfirm={confirmOnboard}
                onClose={closeFlow}
                busy={busy}
                canAdvance={[selected.size > 0, checklistComplete, onboardAdditions.length > 0]}
                steps={[
                    <div className='flex flex-col gap-4'>
                        <SelectGroup label='Committees' options={availableCommittees} selected={selected} onToggle={toggleSelected} />
                        <SelectGroup label='Roles' options={availableRoles} selected={selected} onToggle={toggleSelected} />
                        <span className='text-xs text-login-400'>Aktiv is added automatically with any committee.</span>
                    </div>,
                    <ExternalChecklist flow='onboard' checked={checklist} onToggle={toggleChecklist} />,
                    <div className='flex flex-col gap-3'>
                        <p className='text-sm text-login-200'>{name} will be added to:</p>
                        <div className='flex flex-wrap gap-1.5'>
                            {onboardAdditions.map(group => <Badge key={group} text={group} variant='orange' />)}
                        </div>
                    </div>,
                ]}
            />

            <Wizard
                open={flow === 'offboard'}
                title={`Offboard ${name}`}
                labels={['Review', 'External access', 'Confirm']}
                step={step}
                setStep={setStep}
                variant='danger'
                finalLabel='Offboard'
                onConfirm={confirmOffboard}
                onClose={closeFlow}
                busy={busy}
                canAdvance={[true, checklistComplete, true]}
                steps={[
                    <div className='flex flex-col gap-3'>
                        <p className='text-sm text-login-200'>{name} will be removed from:</p>
                        <div className='flex flex-wrap gap-1.5'>
                            {currentWritable.map(group => <Badge key={group} text={group} variant='default' />)}
                        </div>
                    </div>,
                    <ExternalChecklist flow='offboard' checked={checklist} onToggle={toggleChecklist} />,
                    <Alert variant='warning'>
                        Remove {name} from all managed groups? The account itself is not deactivated; this only
                        clears Aktiv, committee and role membership.
                    </Alert>,
                ]}
            />
        </Card>
    )
}

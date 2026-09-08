'use client'

import Link from 'next/link'
import { Ban, ChevronRight, Clock, TriangleAlert, UserMinus, UserPlus, Users } from 'lucide-react'
import { Badge, Card, IconBubble, StatCard } from 'uibee/components'
import type { MemberReport, ReportMember } from '@utils/api/authentik/getMemberReport'

type Finding = {
    key: string
    title: string
    description: string
    icon: typeof Users
    members: ReportMember[]
    showLastLogin?: boolean
}

function fmtDate(iso: string | null) {
    if (!iso) return 'never'
    return new Date(iso).toISOString().slice(0, 10)
}

function MemberRow({ member, showLastLogin }: { member: ReportMember, showLastLogin?: boolean }) {
    return (
        <Link
            href={`/org/member/${member.pk}`}
            className='group flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-login-500'
        >
            <div className='flex min-w-0 flex-col'>
                <span className='truncate text-sm font-medium text-login-50'>{member.name}</span>
                <span className='truncate text-xs text-login-300'>{member.email || member.username}</span>
            </div>
            <div className='flex shrink-0 items-center gap-1.5'>
                {showLastLogin && (
                    <span className='text-xs tabular-nums text-login-300'>{fmtDate(member.lastLogin)}</span>
                )}
                {member.units.map(unit => <Badge key={unit} text={unit} variant='default' />)}
                <ChevronRight className='h-3.5 w-3.5 text-login-300 transition-colors group-hover:text-login-100' />
            </div>
        </Link>
    )
}

function FindingCard({ finding }: { finding: Finding }) {
    const empty = finding.members.length === 0
    return (
        <Card className='flex flex-col'>
            <div className='flex items-start justify-between gap-3 border-b border-white/5 p-4'>
                <div className='flex items-start gap-3'>
                    <IconBubble icon={finding.icon} tone={empty ? 'emerald' : 'orange'} />
                    <div className='flex flex-col'>
                        <span className='font-semibold text-login-50'>{finding.title}</span>
                        <span className='text-xs text-login-300'>{finding.description}</span>
                    </div>
                </div>
                <Badge text={String(finding.members.length)} variant={empty ? 'emerald' : 'orange'} size='md' />
            </div>
            {empty ? (
                <p className='p-4 text-sm text-login-300'>Nothing flagged.</p>
            ) : (
                <div className='flex flex-col gap-0.5 p-2'>
                    {finding.members.map(member => (
                        <MemberRow key={member.pk} member={member} showLastLogin={finding.showLastLogin} />
                    ))}
                </div>
            )}
        </Card>
    )
}

function StructureColumn({ label, names, emptyLabel }: { label: string, names: string[], emptyLabel: string }) {
    return (
        <div className='flex flex-col gap-2'>
            <span className='text-[10px] font-semibold uppercase tracking-wider text-login-300'>{label}</span>
            {names.length === 0 ? (
                <span className='text-sm font-semibold text-emerald-400'>{emptyLabel}</span>
            ) : (
                <div className='flex flex-wrap gap-1.5'>
                    {names.map(name => <Badge key={name} text={name} variant='default' />)}
                </div>
            )}
        </div>
    )
}

export default function Report({ report }: { report: MemberReport }) {
    const findings: Finding[] = [
        {
            key: 'notInAktiv',
            title: 'In a unit but not in Aktiv',
            description: 'Members of a committee or the board that are missing from the Aktiv group.',
            icon: UserPlus,
            members: report.notInAktiv,
        },
        {
            key: 'unplacedActive',
            title: 'In Aktiv but no committee',
            description: 'Marked active but not placed in any committee or on the board.',
            icon: UserMinus,
            members: report.unplacedActive,
        },
        {
            key: 'dormant',
            title: `Dormant (${report.dormantMonths}+ months no login)`,
            description: 'Active members who have not logged in recently, candidates for offboarding.',
            icon: Clock,
            members: report.dormant,
            showLastLogin: true,
        },
        {
            key: 'inactiveAccounts',
            title: 'Deactivated accounts still in a group',
            description: 'Accounts marked inactive that still hold membership in an org group.',
            icon: Ban,
            members: report.inactiveAccounts,
        },
    ]

    const totalFlags = findings.reduce((sum, finding) => sum + finding.members.length, 0)

    return (
        <div className='flex flex-col gap-6 pb-8'>
            <div className='flex flex-col gap-1'>
                <h1 className='text-lg font-semibold text-login-50'>Member Report</h1>
                <p className='text-xs text-login-300'>Generated {fmtDate(report.generatedAt)}</p>
            </div>

            <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
                <StatCard label='Active members' value={String(report.activeCount)} icon={Users} tone='orange' />
                <StatCard
                    label='Flags'
                    value={String(totalFlags)}
                    icon={TriangleAlert}
                    tone={totalFlags === 0 ? 'emerald' : 'amber'}
                />
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                {findings.map(finding => <FindingCard key={finding.key} finding={finding} />)}
            </div>

            <Card className='flex flex-col'>
                <div className='flex items-center gap-3 border-b border-white/5 p-4'>
                    <IconBubble icon={TriangleAlert} tone='orange' />
                    <span className='font-semibold text-login-50'>Structure</span>
                </div>
                <div className='grid grid-cols-1 gap-4 p-5 sm:grid-cols-2'>
                    <StructureColumn
                        label='Committees without a leader'
                        names={report.committeesWithoutLeader}
                        emptyLabel='All committees have a board leader.'
                    />
                    <StructureColumn
                        label='Empty groups'
                        names={report.emptyUnits}
                        emptyLabel='No empty org groups.'
                    />
                </div>
            </Card>
        </div>
    )
}

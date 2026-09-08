'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Crown, Search, Users } from 'lucide-react'
import { Badge, Card, EmptyState } from 'uibee/components'
import type { Member } from '@utils/api/authentik/members'

function FilterPill({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
    return (
        <button
            type='button'
            onClick={onClick}
            aria-pressed={active}
            className={`
                inline-flex h-9 shrink-0 items-center rounded-lg border px-3 text-sm transition-colors
                ${active
            ? 'border-login/60 bg-login/10 text-login'
            : 'border-login-500/30 bg-login-500/50 text-login-200 hover:text-login-50'}
            `}
        >
            {label}
        </button>
    )
}

function initials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase())
        .join('') || '?'
}

function fmtDate(iso: string | null) {
    if (!iso) return 'never'
    return new Date(iso).toISOString().slice(0, 10)
}

type Props = {
    members: Member[]
}

export default function MemberDirectory({ members }: Props) {
    const [query, setQuery] = useState('')
    const [aktivOnly, setAktivOnly] = useState(false)
    const [hideService, setHideService] = useState(true)

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase()
        return members.filter(member => {
            if (hideService && member.isService) return false
            if (aktivOnly && !member.inAktiv) return false
            if (!needle) return true
            return member.name.toLowerCase().includes(needle)
                || member.username.toLowerCase().includes(needle)
                || member.email.toLowerCase().includes(needle)
                || member.groups.some(group => group.toLowerCase().includes(needle))
        })
    }, [members, query, aktivOnly, hideService])

    return (
        <div className='flex h-full flex-col gap-4 pb-4'>
            <div className='flex flex-col gap-1'>
                <h1 className='text-lg font-semibold text-login-50'>Member Directory</h1>
                <p className='text-xs text-login-300'>{filtered.length} of {members.length} shown</p>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
                <div className='relative min-w-56 flex-1'>
                    <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-login-300' />
                    <input
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        placeholder='Search name, username, email or group'
                        className={`
                            h-9 w-full rounded-lg border border-login-500/30 bg-login-500/50 pl-9 pr-3 text-sm
                            text-login-50 placeholder:text-login-300 focus:border-login/60 focus:outline-none
                        `}
                    />
                </div>
                <FilterPill active={aktivOnly} onClick={() => setAktivOnly(v => !v)} label='Active only' />
                <FilterPill active={hideService} onClick={() => setHideService(v => !v)} label='Hide service' />
            </div>

            <Card className='flex min-h-0 flex-1 flex-col divide-y divide-white/5 overflow-y-auto'>
                {filtered.length === 0 ? (
                    <EmptyState icon={Users} title='No members match' description='Try a different search or loosen the filters.' />
                ) : (
                    filtered.map(member => (
                        <Link
                            key={member.pk}
                            href={`/org/member/${member.pk}`}
                            className='group flex items-center gap-3 px-3 py-2 transition-colors hover:bg-login-500'
                        >
                            <span className={`
                                flex h-9 w-9 min-w-9 items-center justify-center rounded-full text-xs font-semibold
                                ${member.inAktiv ? 'bg-login/20 text-login' : 'bg-login-600 text-login-100'}
                            `}>
                                {initials(member.name)}
                            </span>

                            <div className='flex min-w-0 flex-1 flex-col'>
                                <span className='flex items-center gap-1.5 truncate text-sm font-medium text-login-50'>
                                    {member.name}
                                    {member.isBoard && (
                                        <Crown className='h-3.5 w-3.5 shrink-0 text-login' fill='currentColor' />
                                    )}
                                </span>
                                <span className='truncate text-xs text-login-300'>{member.email || member.username}</span>
                            </div>

                            <div className='hidden max-w-[40%] flex-wrap justify-end gap-1 sm:flex'>
                                {member.units.map(unit => <Badge key={unit} text={unit} variant='default' />)}
                            </div>

                            {!member.isActive && <Badge text='Inactive' variant='danger' />}

                            <span className='hidden w-20 shrink-0 text-right text-xs tabular-nums text-login-300 md:block'>
                                {fmtDate(member.lastLogin)}
                            </span>
                            <ChevronRight className='h-4 w-4 shrink-0 text-login-300 transition-colors group-hover:text-login-100' />
                        </Link>
                    ))
                )}
            </Card>
        </div>
    )
}

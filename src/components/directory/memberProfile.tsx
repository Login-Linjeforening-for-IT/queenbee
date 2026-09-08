import Link from 'next/link'
import { ArrowLeft, Crown, ExternalLink } from 'lucide-react'
import { Badge, Card } from 'uibee/components'
import type { Member as Profile } from '@utils/api/authentik/members'
import { REMOVABLE_GROUPS } from '@utils/api/authentik/orgGroups'

const MANAGED_GROUP_SET = new Set(REMOVABLE_GROUPS)

function fmtDate(iso: string | null) {
    if (!iso) return 'Never'
    return new Date(iso).toISOString().slice(0, 10)
}

function initials(name: string) {
    return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join('') || '?'
}

function Stat({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <div className='mb-1 text-[10px] font-semibold uppercase tracking-wider text-login-300'>{label}</div>
            <div className='truncate text-sm font-semibold text-login-50' title={value}>{value}</div>
        </div>
    )
}

export default function MemberProfile({ profile, authentikUrl }: { profile: Profile, authentikUrl: string }) {
    // Aktiv, committees and roles are shown (and managed) by the membership panel
    // below, so only surface groups it does not already cover to avoid repeats.
    const otherGroups = profile.groups.filter(group => !MANAGED_GROUP_SET.has(group))

    return (
        <div className='flex flex-col gap-6 pb-8'>
            <Link
                href='/org/directory'
                className='flex w-fit items-center gap-1.5 text-sm text-login-300 transition-colors hover:text-login-50'
            >
                <ArrowLeft className='h-4 w-4' /> Directory
            </Link>

            <Card className='flex flex-col gap-6 p-6'>
                <div className='flex flex-wrap items-center justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                        {profile.avatar ? (
                            <img src={profile.avatar} alt='' className='h-16 w-16 rounded-full object-cover' />
                        ) : (
                            <span className={`
                                flex h-16 w-16 items-center justify-center rounded-full
                                bg-login-600 text-lg font-medium text-login-100
                            `}>
                                {initials(profile.name)}
                            </span>
                        )}
                        <div className='flex flex-col gap-1'>
                            <div className='flex items-center gap-2'>
                                <h1 className='text-lg font-semibold text-login-50'>{profile.name}</h1>
                                {profile.isBoard && <Crown className='h-5 w-5 text-login' fill='currentColor' />}
                            </div>
                            <span className='text-sm text-login-300'>@{profile.username}</span>
                        </div>
                    </div>
                    <a
                        href={`${authentikUrl}/if/admin/#/identity/users/${profile.pk}`}
                        target='_blank'
                        rel='noreferrer'
                        className={`
                            flex items-center gap-2 rounded-md bg-login-500 px-3 py-2 text-sm font-medium
                            text-login-50 transition-all duration-150 hover:bg-login-400
                        `}
                    >
                        <ExternalLink className='h-4 w-4' /> Open in Authentik
                    </a>
                </div>

                <div className='flex flex-wrap gap-2'>
                    {profile.inAktiv && <Badge text='Active member' variant='orange' />}
                    {profile.isBoard && <Badge text='Board' variant='orange' />}
                    {profile.isSuperuser && <Badge text='Superuser' variant='violet' />}
                    {profile.isService && <Badge text='Service account' variant='default' />}
                    {!profile.isActive && <Badge text='Inactive' variant='danger' />}
                </div>

                <div className='grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/5 pt-5 sm:grid-cols-4'>
                    <Stat label='Email' value={profile.email || 'Not set'} />
                    <Stat label='Account created' value={fmtDate(profile.joined)} />
                    <Stat label='Last login' value={fmtDate(profile.lastLogin)} />
                    <Stat label='Status' value={profile.isActive ? 'Active' : 'Deactivated'} />
                </div>
            </Card>

            {otherGroups.length > 0 && (
                <Card className='flex flex-col gap-3 p-5'>
                    <span className='text-xs font-semibold uppercase tracking-wider text-login-300'>Other groups</span>
                    <div className='flex flex-wrap gap-1.5'>
                        {otherGroups.map(group => <Badge key={group} text={group} variant='default' />)}
                    </div>
                </Card>
            )}
        </div>
    )
}

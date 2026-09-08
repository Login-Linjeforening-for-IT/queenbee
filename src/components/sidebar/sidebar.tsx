'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
    BriefcaseBusiness,
    Building2,
    Calendar,
    ClipboardList,
    Contact,
    Gavel,
    Icon,
    Images,
    LayoutDashboard,
    LogOut,
    MapPin,
    Megaphone,
    Network,
    Smartphone,
    Shield,
    Activity,
    Database,
    Logs,
    Scale,
    TriangleAlert,
    Waypoints,
    ShieldAlert,
    type LucideIcon,
    type LucideProps
} from 'lucide-react'
import { hexagons7 } from '@lucide/lab'
import { getCookie, setCookie } from 'utilbee/utils'
import { Sidebar as SidebarLayout, type SidebarItem } from 'uibee/components'
import SidebarVersion from './sidebarVersion'
import config from '@config'

function Hexagons7(props: LucideProps) {
    return <Icon iconNode={hexagons7} {...props} />
}

type Section = 'content' | 'internal' | 'org'

function getSection(pathname: string): Section {
    if (pathname.startsWith('/internal')) return 'internal'
    if (pathname === '/org' || pathname.startsWith('/org/')) return 'org'
    return 'content'
}

const SECTION_LABEL: Record<Section, string> = {
    content: 'Content',
    internal: 'Internal',
    org: 'Org Management',
}

function BottomLink({ href, icon: Icon, label, expanded, active }: {
    href: string
    icon: LucideIcon
    label: string
    expanded: boolean
    active: boolean
}) {
    return (
        <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`
                flex items-center p-3 rounded-lg w-full overflow-hidden transition-colors group
                ${active ? 'bg-login/10 text-login' : 'hover:bg-login-800 text-login-200 hover:text-login-100'}
            `}
            title={!expanded ? label : ''}
        >
            <div className={`
                min-w-6 w-6 flex items-center justify-center transition-all duration-300
                ${expanded ? '' : 'translate-x-1'}
            `}>
                <Icon className='w-6 min-w-6' />
            </div>
            <span className={`
                whitespace-nowrap overflow-hidden transition-all duration-300
                ${expanded ? 'opacity-100 max-w-48 ml-3' : 'opacity-0 max-w-0 ml-0'}
            `}>
                {label}
            </span>
        </Link>
    )
}

type SidebarProps = {
    mobile?: boolean
    initialExpanded?: boolean
    initialHasToken?: boolean
}

export default function Sidebar({ mobile, initialExpanded = true, initialHasToken = false }: SidebarProps) {
    const [hasToken] = useState(initialHasToken)

    const [groups, setGroups] = useState<string | undefined>(undefined)
    const pathname = usePathname()
    const section = getSection(pathname)
    const lowerGroups = (groups ?? '').toLowerCase()
    const hasTekkom = lowerGroups.includes('tekkom')
    const canManageOrg = lowerGroups.includes('styret') || lowerGroups.includes('authentik admins')

    useEffect(() => {
        setGroups(getCookie('user_groups') || undefined)
    }, [])

    if (!hasToken) {
        return null
    }

    const mainPaths: SidebarItem[] = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Announcements',
            path: '/announcements',
            icon: Megaphone,
        },
        {
            name: 'Albums',
            path: '/albums',
            icon: Images,
        },
        {
            name: 'Events',
            path: '/events',
            icon: Calendar,
        },
        {
            name: 'Honey',
            path: '/honey',
            icon: Hexagons7,
        },
        {
            name: 'Jobs',
            path: '/jobs',
            icon: BriefcaseBusiness,
        },
        {
            name: 'Locations',
            path: '/locations?type=address',
            icon: MapPin,
            items: [
                { name: 'Address', path: '/locations?type=address' },
                { name: 'Coordinate', path: '/locations?type=coordinate' },
                { name: 'Mazemap', path: '/locations?type=mazemap' },
                { name: 'Digital', path: '/locations?type=digital' },
            ]
        },
        {
            name: 'Nucleus',
            path: '/nucleus',
            icon: Smartphone,
        },
        {
            name: 'Organizations',
            path: '/organizations',
            icon: Building2,
        },
        {
            name: 'Rules',
            path: '/rules',
            icon: Gavel,
        },
    ]

    const internalPaths: SidebarItem[] = [
        {
            name: 'Dashboard',
            path: '/internal',
            icon: LayoutDashboard
        },
        {
            name: 'Alerts',
            path: '/internal/alerts',
            icon: TriangleAlert,
        },
        {
            name: 'Databases',
            path: '/internal/db',
            icon: Database,
            items: [
                { name: 'Overview', path: '/internal/db' },
                { name: 'Backup', path: '/internal/db/backups' },
            ]
        },
        {
            name: 'Load Balancing',
            path: '/internal/loadbalancing',
            icon: Scale,
        },
        {
            name: 'Logs',
            path: '/internal/logs',
            icon: Logs,
        },
        {
            name: 'Monitoring',
            path: '/internal/monitoring',
            icon: Activity,
            items: [
                { name: 'Services', path: '/internal/monitoring' },
                { name: 'Notifications', path: '/internal/monitoring/notifications' },
            ]
        },
        {
            name: 'Traffic',
            path: '/internal/traffic',
            icon: Waypoints,
            items: [
                { name: 'Metrics', path: '/internal/traffic' },
                { name: 'Records', path: '/internal/traffic/records' },
                { name: 'Map', path: '/internal/traffic/map' },
            ]
        },
        {
            name: 'Vulnerabilities',
            path: '/internal/vulnerabilities',
            icon: ShieldAlert
        }
    ]

    const orgPaths: SidebarItem[] = [
        {
            name: 'Org Chart',
            path: '/org/chart',
            icon: Network,
        },
        {
            name: 'Directory',
            path: '/org/directory',
            icon: Contact,
        },
        {
            name: 'Report',
            path: '/org/report',
            icon: ClipboardList,
        },
    ]

    const items = section === 'internal' ? internalPaths : section === 'org' ? orgPaths : mainPaths

    const sections: { key: Section, label: string, href: string, icon: LucideIcon, show: boolean }[] = [
        { key: 'content', label: SECTION_LABEL.content, href: '/dashboard', icon: LayoutDashboard, show: true },
        { key: 'internal', label: SECTION_LABEL.internal, href: '/internal', icon: Shield, show: hasTekkom },
        { key: 'org', label: SECTION_LABEL.org, href: '/org/chart', icon: Network, show: canManageOrg },
    ]

    return (
        <SidebarLayout
            items={items}
            mobile={mobile}
            initialExpanded={initialExpanded}
            onExpandedChange={(next) => setCookie('sidebar_expanded', String(next))}
            className={mobile ? 'h-[calc(100vh-var(--h-navbar))]' : ''}
            header={(expanded) => (
                <>
                    <div className='relative h-8 w-8 min-w-8'>
                        <Image
                            src='/images/queenbee-logo.png'
                            alt='QueenBee'
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                    <div className={`
                        flex flex-col overflow-hidden transition-all duration-300
                        ${expanded ? 'opacity-100 max-w-48' : 'opacity-0 max-w-0'}
                    `}>
                        <span className='font-bold text-lg leading-tight tracking-wide text-login-50 whitespace-nowrap'>
                            QueenBee
                        </span>
                        <span className='text-[10px] font-medium uppercase tracking-wider text-login whitespace-nowrap'>
                            {SECTION_LABEL[section]}
                        </span>
                    </div>
                </>
            )}
            bottomAction={(expanded) => (
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        {sections.filter(item => item.show).map(item => (
                            <BottomLink
                                key={item.key}
                                href={item.href}
                                icon={item.icon}
                                label={item.label}
                                expanded={expanded}
                                active={section === item.key}
                            />
                        ))}
                    </div>

                    <div className='h-px bg-login-600' />

                    <button
                        onClick={() => window.location.href = config.authPath.logout}
                        className={`
                            flex items-center p-3 rounded-lg w-full overflow-hidden
                            hover:bg-red-500/10 text-login-200 hover:text-red-400
                            transition-colors group
                        `}
                        title={!expanded ? 'Logout' : ''}
                    >
                        <div className={`
                            min-w-6 w-6 flex items-center justify-center transition-all duration-300
                            ${expanded ? '' : 'translate-x-1'}
                        `}>
                            <LogOut className='w-6 min-w-6' />
                        </div>
                        <span
                            className={`
                                whitespace-nowrap overflow-hidden transition-all duration-300
                                ${expanded ? 'opacity-100 max-w-48 ml-3' : 'opacity-0 max-w-0 ml-0'}
                            `}
                        >
                            Logout
                        </span>
                    </button>

                    <div
                        className={`
                            transition-all duration-300 ease-in-out overflow-hidden
                            ${expanded ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
                        `}
                    >
                        <SidebarVersion />
                    </div>
                </div>
            )}
        />
    )
}

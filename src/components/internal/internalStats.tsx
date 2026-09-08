'use client'

import Stat from '@components/dashboard/stat'
import { Activity, AlertCircle, Database, Waypoints } from 'lucide-react'

type InternalStatsProps = {
    statistics: InternalDashboardStatistics
}

export default function InternalStats({ statistics }: InternalStatsProps) {
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Stat text='alerts' link='internal/alerts' count={statistics.alerts} item={AlertCircle} />
            <Stat text='databases' link='internal/db' count={statistics.databases} item={Database} />
            <Stat text='monitored sites' link='internal/monitoring' count={statistics.monitored} item={Activity} />
            <Stat text='requests today' link='internal/traffic' count={statistics.requestsToday} item={Waypoints} />
        </div>
    )
}

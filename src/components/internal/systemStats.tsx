'use client'

import { Boxes, Cpu, HardDrive, MemoryStick, Server, Thermometer, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Card, IconBubble, StatCard } from 'uibee/components'
import getInternalDashboard from '@utils/api/beekeeper/dashboard/get'

type SystemStatsProps = {
    initialDashboard: InternalDashboard
}

const refreshOptions = [
    { label: 'Off', value: 0 },
    { label: '1s', value: 1000 },
    { label: '3s', value: 3000 },
    { label: '5s', value: 5000 },
    { label: '10s', value: 10000 },
    { label: '30s', value: 30000 },
    { label: '1m', value: 60000 },
    { label: '5m', value: 300000 },
]

export default function SystemStats({ initialDashboard }: SystemStatsProps) {
    const [metrics, setMetrics] = useState(initialDashboard.runtime.metrics)
    const [docker, setDocker] = useState(initialDashboard.runtime.docker)
    const [autoRefresh, setAutoRefresh] = useState(10000)

    const usedMemory = metrics?.system?.memory?.used ? (metrics.system.memory.used / 1073741824).toFixed(2) : '0.00'
    const totalMemory = metrics?.system?.memory?.total ? (metrics.system.memory.total / 1073741824).toFixed(2) : '0.00'
    const usedMemoryPercentage = metrics?.system?.memory?.percent || '0'

    useEffect(() => {
        if (autoRefresh === 0) {
            return
        }

        const intervalId = setInterval(async () => {
            const updatedDashboard = await getInternalDashboard()
            setMetrics(updatedDashboard.runtime.metrics)
            setDocker(updatedDashboard.runtime.docker)
        }, autoRefresh)

        return () => clearInterval(intervalId)
    }, [autoRefresh])

    function handleAutoRefresh(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedOption = refreshOptions.find(opt => opt.label === e.target.value)
        if (selectedOption) {
            setAutoRefresh(selectedOption.value)
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold'>System Resources</h2>
                <Card className='flex items-center gap-3 p-1'>
                    <span className='px-2 text-xs font-medium text-login-200 uppercase'>Auto-refresh</span>
                    <select
                        className='bg-transparent text-sm font-medium outline-none cursor-pointer text-login-50'
                        value={refreshOptions.find(opt => opt.value === autoRefresh)?.label || '10s'}
                        onChange={handleAutoRefresh}
                    >
                        {refreshOptions.map(option => (
                            <option key={option.label} value={option.label} className='bg-login-900'>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </Card>
            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
                <StatCard icon={Server} label='Operating System' value={metrics?.system?.os || 'Unknown'} tone='blue' />

                <Card className='p-4 lg:col-span-2 xl:col-span-1'>
                    <div className='flex items-center gap-3 mb-4'>
                        <IconBubble icon={Cpu} tone='emerald' />
                        <span className='text-sm font-medium text-login-200'>System Load Average</span>
                    </div>
                    <div className='grid grid-cols-3 gap-2 text-center divide-x divide-login-500/25'>
                        <div>
                            <div className='text-xs text-login-200 mb-1'>1m</div>
                            <div className='text-base font-bold text-login-50'>{metrics?.system?.load?.[0] || '0'}%</div>
                        </div>
                        <div>
                            <div className='text-xs text-login-200 mb-1'>5m</div>
                            <div className='text-base font-bold text-login-50'>{metrics?.system?.load?.[1] || '0'}%</div>
                        </div>
                        <div>
                            <div className='text-xs text-login-200 mb-1'>15m</div>
                            <div className='text-base font-bold text-login-50'>{metrics?.system?.load?.[2] || '0'}%</div>
                        </div>
                    </div>
                </Card>

                <Card className='p-4 lg:col-span-2'>
                    <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center gap-3'>
                            <IconBubble icon={MemoryStick} tone='blue' />
                            <span className='text-sm font-medium text-login-200'>Memory Usage</span>
                        </div>
                        <span className='text-sm font-bold text-sky-400'>{usedMemoryPercentage}%</span>
                    </div>
                    <div className='space-y-2'>
                        <div className='h-2 bg-login-700 rounded-full overflow-hidden'>
                            <div
                                className='h-full bg-sky-500 transition-all duration-500'
                                style={{ width: `${Math.min(Number(usedMemoryPercentage), 100)}%` }}
                            />
                        </div>
                        <div className='flex justify-between text-xs text-login-200'>
                            <span>{usedMemory} GB Used</span>
                            <span>{totalMemory} GB Total</span>
                        </div>
                    </div>
                </Card>

                <StatCard icon={HardDrive} label='Disk Usage' value={metrics?.system?.disk || 'Unknown'} tone='orange' />
                <StatCard icon={Thermometer} label='Temperature' value={metrics?.system?.temperature || 'Unknown'} tone='rose' />
                <StatCard icon={Zap} label='Power Draw' value={metrics?.system?.powerUsage || 'Unknown'} tone='amber' />
                <StatCard icon={Boxes} label='Total Processes' value={String(metrics?.system?.processes || '0')} tone='violet' />
                <StatCard icon={Boxes} label='Active Containers' value={String(docker.count)} tone='blue' />
            </div>

            <Card className='p-4'>
                <div className='flex items-center gap-3 mb-4'>
                    <IconBubble icon={MemoryStick} tone='violet' />
                    <span className='text-sm font-medium text-login-200'>Network Interfaces</span>
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                        <div className='text-xs uppercase tracking-wider text-login-200 mb-2 font-semibold'>IPv4 Addresses</div>
                        <div className='bg-login-900/60 rounded-lg p-3 font-mono text-sm text-indigo-300'>
                            {metrics?.system?.ipv4?.length ? (
                                metrics.system.ipv4.map((ip, i) => (
                                    <div key={i}>{ip}</div>
                                ))
                            ) : <span className='text-login-200'>No IPv4 addresses found</span>}
                        </div>
                    </div>
                    <div>
                        <div className='text-xs uppercase tracking-wider text-login-200 mb-2 font-semibold'>IPv6 Addresses</div>
                        <div className='bg-login-900/60 rounded-lg p-3 font-mono text-xs text-indigo-300 break-all'>
                            {metrics?.system?.ipv6?.length ? (
                                metrics.system.ipv6.map((ip, i) => (
                                    <div key={i}>{ip}</div>
                                ))
                            ) : <span className='text-login-200'>No IPv6 addresses found</span>}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

'use server'

import { getWrapper } from '@utils/apiWrapper'

export default async function getInternalDashboard(): Promise<InternalDashboard> {
    const data = await getWrapper({
        path: 'dashboard/internal',
        service: 'beekeeper'
    })

    const dashboard = normalizeDashboard(typeof data === 'string' ? null : data)
    return dashboard
}

function normalizeDashboard(data: unknown): InternalDashboard {
    const source = isRecord(data) ? data : {}
    const runtime = isRecord(source.runtime) ? source.runtime : {}
    const information = isRecord(source.information) ? source.information : {}
    const statistics = isRecord(source.statistics) ? source.statistics : {}

    return {
        statistics: {
            alerts: toNumber(statistics.alerts, 0),
            databases: toNumber(statistics.databases, 0),
            monitored: toNumber(statistics.monitored, 0),
            requestsToday: toNumber(statistics.requestsToday, 0)
        },
        information: {
            system: normalizeSystem(information.system),
        },
        runtime: {
            metrics: normalizeMetrics(runtime.metrics),
            docker: normalizeDocker(runtime.docker),
            databaseOverview: isRecord(runtime.databaseOverview) ? runtime.databaseOverview as GetDatabaseOverview : null,
        }
    }
}

function normalizeSystem(value: unknown) {
    const system = isRecord(value) ? value : {}
    return {
        ram: typeof system.ram === 'string' ? system.ram : 'No RAM',
        processes: toNumber(system.processes, 0),
        disk: typeof system.disk === 'string' ? system.disk : 'No disk',
        load: typeof system.load === 'string' ? system.load : 'No load',
        containers: toNumber(system.containers, 0)
    }
}

function normalizeMetrics(value: unknown): Stats {
    const metrics = isRecord(value) ? value : {}
    const system = isRecord(metrics.system) ? metrics.system : {}
    const memory = isRecord(system.memory) ? system.memory : {}

    return {
        system: {
            load: Array.isArray(system.load) ? system.load.map(item => Number(item) || 0) : [],
            memory: {
                used: toNumber(memory.used, 0),
                total: toNumber(memory.total, 0),
                percent: String(memory.percent ?? '0')
            },
            swap: String(system.swap ?? '0'),
            disk: String(system.disk ?? 'N/A'),
            temperature: String(system.temperature ?? 'N/A'),
            powerUsage: String(system.powerUsage ?? 'N/A'),
            processes: toNumber(system.processes, 0),
            ipv4: Array.isArray(system.ipv4) ? system.ipv4.filter((item): item is string => typeof item === 'string') : [],
            ipv6: Array.isArray(system.ipv6) ? system.ipv6.filter((item): item is string => typeof item === 'string') : [],
            os: String(system.os ?? 'Unknown')
        }
    }
}

function normalizeDocker(value: unknown): Docker {
    const docker = isRecord(value) ? value : {}
    const containers = Array.isArray(docker.containers)
        ? docker.containers.map(normalizeContainer)
        : []

    return {
        status: docker.status === 'available' || docker.status === 'unavailable'
            ? docker.status
            : containers.length ? 'available' : 'unavailable',
        count: toNumber(docker.count, containers.length),
        containers,
        error: typeof docker.error === 'string' ? docker.error : null,
    }
}

function normalizeContainer(value: unknown): Container {
    const container = isRecord(value) ? value : {}
    return {
        id: String(container.id || ''),
        name: String(container.name || ''),
        status: String(container.status || 'unknown'),
        project: String(container.project || ''),
        deployment: isRecord(container.deployment) ? container.deployment as DeploymentStatus : null,
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function toNumber(value: unknown, fallback: number) {
    const number = Number(value)
    return Number.isFinite(number) ? number : fallback
}

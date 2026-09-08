import packageInfo from './package.json'

const { env } = process

const config = {
    url: {
        git: env.GIT_URL || 'https://gitlab.login.no',
        cdn: env.CDN_URL || 'https://s3.login.no/beehive',
        authentik: env.AUTHENTIK_URL || 'https://authentik.login.no',
        api: env.WORKERBEE_API_URL || 'https://workerbee.login.no/api/v2',
        bot: env.TEKKOM_BOT_API_URL || 'https://bot.login.no/api',
        app: env.APP_API_URL || 'https://app.login.no/api',
        beekeeper: env.BEEKEEPER_API_URL || 'https://beekeeper.login.no/api',
    },
    authPath: {
        login:    '/api/auth/login',
        callback: '/api/auth/callback',
        token:    '/api/auth/token',
        logout:   '/api/auth/logout',
    },
    authentik: {
        client: {
            id: env.AUTHENTIK_CLIENT_ID,
            secret: env.AUTHENTIK_CLIENT_SECRET,
        },
        url: {
            auth: `${env.AUTHENTIK_URL}/application/o/authorize/`,
            userinfo: `${env.AUTHENTIK_URL}/application/o/userinfo/`,
            token: `${env.AUTHENTIK_URL}/application/o/token/`,
        },
        token: env.AUTHENTIK_API_TOKEN,
    },
    beekeeper: {
        api: env.NEXT_PUBLIC_BEEKEEPER_API_URL || 'https://beekeeper.login.no/api',
        defaultCluster: 'infra-prod-cluster',
        status: {
            services: {
                get: 'monitoring',
                put: 'monitoring',
                post: 'monitoring',
                delete: 'monitoring',
            },
            notifications: {
                get: 'monitoring/notifications',
                put: 'monitoring/notification',
                post: 'monitoring/notification',
                delete: 'monitoring/notification',
            },
            tags: {
                get: 'monitoring/tags',
                post: 'monitoring/tag',
                delete: 'monitoring/tag'
            }
        },
        traffic: {
            metrics: 'traffic/metrics',
            records: 'traffic/records',
            domains: 'traffic/domains',
            live: 'traffic/live',
        },
        dashboard: {
            internal: 'dashboard/internal'
        }
    },
    version: packageInfo.version,
}

export default config

import appConfig from '@config'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(req: NextRequest) {
    const tokenCookie = req.cookies.get('access_token')
    let validToken = false

    if (!pathIsAllowedWhileUnauthorized(req.nextUrl.pathname)) {
        if (!tokenCookie) {
            const res = NextResponse.redirect(new URL('/', req.url))
            res.cookies.set('redirect_after_login', req.nextUrl.pathname)
            return res
        }

        const btgCookie = req.cookies.get('btg_name')
        const btg = btgCookie?.value
        const token = tokenCookie.value

        if (btg) {
            validToken = await btgTokenIsValid(token, btg, req.nextUrl.pathname)
            if (!validToken) {
                return NextResponse.redirect(new URL('/api/auth/logout', req.url))
            }
        }

        if (!validToken) {
            const response = await tokenIsValid(token, req.nextUrl.pathname)
            validToken = response.valid
            if (!validToken) {
                return NextResponse.redirect(new URL('/api/auth/logout', req.url))
            }
        }

        if (req.nextUrl.pathname.startsWith('/internal')) {
            const response = await tokenIsValid(token, req.nextUrl.pathname)
            const groups = response.groups || []
            const lowerGroups = groups.map((g) => g.toLowerCase())
            if (!lowerGroups.includes('tekkom')) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
        }

        if (req.nextUrl.pathname === '/org' || req.nextUrl.pathname.startsWith('/org/')) {
            const response = await tokenIsValid(token, req.nextUrl.pathname)
            const lowerGroups = (response.groups || []).map((g) => g.toLowerCase())
            const canManageOrg = lowerGroups.includes('styret') || lowerGroups.includes('authentik admins')
            if (!canManageOrg) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
        }
    }

    const theme = req.cookies.get('theme')?.value || 'dark'
    const res = NextResponse.next()
    res.headers.set('x-theme', theme)
    return res
}

async function tokenIsValid(token: string, pathname?: string): Promise<{ valid: boolean; groups?: string[] }> {
    try {
        const userInfo = await fetch(appConfig.authentik.url.userinfo, {
            headers: { Authorization: `Bearer ${token}` },
            signal: AbortSignal.timeout(3000),
        })

        if (!userInfo.ok) {
            return { valid: false }
        }

        const data = await userInfo.json()

        if (!Array.isArray(data.groups) || !data.groups.map((g: string) => g.toLowerCase()).includes('queenbee')) {
            return { valid: false }
        }

        return { valid: true, groups: data.groups }
    } catch (error) {
        logProxyError('proxy.auth.userinfo_failed', error, {
            path: pathname,
        })

        return { valid: false }
    }
}

async function btgTokenIsValid(token: string, name: string, pathname?: string): Promise<boolean> {
    try {
        const response = await fetch(`${appConfig.url.bot}/token`, {
            headers: {
                Authorization: `Bearer ${token}`,
                name,
                btg: 'queenbee-btg',
                middleware: 'true',
            },
            signal: AbortSignal.timeout(3000),
        })

        if (!response.ok) {
            throw new Error(await response.text())
        }

        return true
    } catch (error) {
        logProxyError('proxy.auth.btg_validation_failed', error, {
            name,
            path: pathname,
        })

        return false
    }
}

function logProxyError(message: string, error: unknown, context?: Record<string, unknown>) {
    const normalizedError = error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
    } : { message: String(error) }

    console.log(JSON.stringify({
        time: new Date().toISOString(),
        level: 'error',
        service: 'queenbee',
        runtime: 'web',
        environment: process.env.NODE_ENV ?? 'development',
        pid: process.pid,
        hostname: process.env.HOSTNAME,
        msg: message,
        err: normalizedError,
        context,
    }))
}

function pathIsAllowedWhileUnauthorized(path: string) {
    if (path === '/' || path === '/favicon.ico') {
        return true
    }

    if (
        path.startsWith('/_next/static/') ||
        path.startsWith('/_next/image') ||
        path.startsWith('/images/') ||
        path.startsWith('/api/authentik-health') ||
        path.startsWith('/api/auth') ||
        path.startsWith('/_next/webpack-hmr')
    ) {
        return true
    }

    return false
}

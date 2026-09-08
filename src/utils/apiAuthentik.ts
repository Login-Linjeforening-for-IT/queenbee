'use server'

import config from '@config'

type AuthentikApiWrapperProps = {
    path: string
    token: string
    method?: 'GET' | 'POST'
    body?: object
}

export async function authentikApiWrapper({ path, token, method = 'GET', body }: AuthentikApiWrapperProps) {
    const url = `${config.url.authentik}/api/v3${path}`

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }

    const options: RequestInit = {
        method,
        headers,
        signal: AbortSignal.timeout(3000),
        ...(body !== undefined && { body: JSON.stringify(body) }),
    }

    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Authentik API error: ${response.status} ${errorText}`)
        }

        const text = await response.text()
        return text ? JSON.parse(text) : null
    } catch (error) {
        console.error('Authentik API call failed:', error)
        throw error
    }
}

// Walks a paginated Authentik list endpoint (results + pagination.next), capped
// at 20 pages. `path` may already carry query params; `page` is appended.
export async function fetchAllPages(path: string, token: string): Promise<unknown[]> {
    const sep = path.includes('?') ? '&' : '?'
    const all: unknown[] = []
    for (let page = 1; page <= 20; page += 1) {
        const data = await authentikApiWrapper({ path: `${path}${sep}page=${page}`, token })
        all.push(...(data?.results ?? []))
        if (!data?.pagination?.next) break
    }
    return all
}

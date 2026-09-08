import { NextRequest } from 'next/server'
import { authLogout } from 'uibee/utils'

async function logout(request: NextRequest) {
    return await authLogout({
        req: request
    })
}

export async function GET(request: NextRequest) {
    return await logout(request)
}

// The middleware redirects invalid-token requests here with a 307, which
// preserves the method. A Server Action that fails token validation therefore
// arrives as a POST, so handle it to log out cleanly instead of 405-ing and
// surfacing "An unexpected response was received from the server" on the client.
export async function POST(request: NextRequest) {
    return await logout(request)
}

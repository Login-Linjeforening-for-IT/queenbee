type Auth = {
    'Content-Type': 'application/json'
    'Authorization': string
    'X-Refresh-Token': string
}

export default function auth(): Auth {
    // Retrieve the access token and refresh token from sessionStorage
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-Refresh-Token': refreshToken || ''
    }
}
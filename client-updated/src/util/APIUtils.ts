import { ACCESS_TOKEN, API_BASE_URL } from '../constants/constants.ts';

interface RequestOptions {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: string;
}

const request = (options: RequestOptions) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    const token = localStorage.getItem(ACCESS_TOKEN);

    // Only add Authorization header if skipAuth is NOT set to true
    if (token && !options.skipAuth) {
        headers['Authorization'] = 'Bearer ' + token;
        console.log('Sending request with Authorization header:', headers['Authorization']);
    } else {
        console.log('No token or token skipped for request');
    }

    const fetchOptions: RequestInit = {
        method: options.method || 'GET',
        headers,
        body: options.body,
        // Include credentials if specified (needed for logout)
        credentials: options.credentials || 'omit' as RequestCredentials,
    };

    // ... (rest of the fetch logic remains the same)
    return fetch(options.url, fetchOptions)
        .then(response => {
            console.log('Response status:', response.status);
            // Handle non-JSON responses (like 200 OK from logout)
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(json => ({ json, response }));
            }
            // Handle empty success response (like 200 OK from logout)
            return { json: null, response };
        })
        .then(({ json, response }) => {
            if (!response.ok) {
                console.log('Request failed with:', json || response.statusText);
                return Promise.reject(json || { message: response.statusText, status: response.status });
            }
            return json;
        });
};

export const getCurrentUser = (): Promise<User> => {
    return request({
        url: API_BASE_URL + "/profile",
        method: 'GET'
    }).then(response => ({
        ...response,
        id: String(response.id) // Convert number to string if needed
    }));
};

export const logoutUser = async (): Promise<void> => {
    // Note: The /api/logout endpoint requires a POST request
    const LOGOUT_URL = API_BASE_URL + "/api/logout"; // CORRECTED URL

    try {
        await request({
            url: LOGOUT_URL,
            method: 'POST',
            skipAuth: true,       // CRITICAL: Do NOT send Bearer token
            credentials: 'include' // CRITICAL: Ensure session cookie is sent
        });
        console.log('Server-side logout completed successfully.');

    } catch (error) {
        console.error('Logout failed, but proceeding with client cleanup:', error);
        // We catch errors but continue to clear client state
    } finally {
        // ALWAYS clear client state regardless of server response
        localStorage.removeItem(ACCESS_TOKEN);
        console.log('Client-side token cleared.');
    }
};
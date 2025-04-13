import axios, { AxiosError } from 'axios'

interface ApiClientError {
    message: string
    status: number
    errors: Record<string, string[]>
}

// Function to get CSRF token from cookies
function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

const errorMessages: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized - Please login again',
    403: 'Forbidden - You do not have permission',
    404: 'Resource not found',
    409: 'Conflict - Resource already exists',
    422: 'Validation Error',
    429: 'Too many requests - Please try again later',
    500: 'Server Error - Please try again later',
};

const getErrorMessage = (error: AxiosError<ApiClientError>) => {
    if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        return Object.values(errors).flat().join(', ');
    }

    if (error.response?.data?.message) {
        return error.response.data.message
    }

    return errorMessages[error.response?.status || 500] || 'An unexpected error occurred'
}

// Request interceptor to add CSRF token
apiClient.interceptors.request.use((config) => {
    // Only add CSRF token for non-GET requests
    if (config.method !== 'get') {
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
    }
    return config;
});

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiClientError>) => {
        const errorMessage = getErrorMessage(error)
        console.log(errorMessage)

        // Handle CSRF token errors specifically
        if (error.response?.status === 403 && error.response?.data?.message?.includes('CSRF')) {
            // Optionally refresh the page or handle CSRF errors differently
            console.error('CSRF token validation failed');
        }

        return Promise.reject(error)
    }
)

export default apiClient
// Get the current origin (supports both Vite and Next.js)
const getOrigin = () => {
    if (typeof window !== 'undefined') {
        return window.location.origin
    }
    return import.meta.env.VITE_CURRENT_ORIGIN || 'http://localhost:5173'
}

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

// Add other auth-related configs here if needed
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
export const CURRENT_ORIGIN = getOrigin() 
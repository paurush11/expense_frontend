import { createContext, useContext, ReactNode } from 'react'
import { User, LoginCredentials, RegisterCredentials, ApiError, FormattedError } from '../hooks/types'
import { useAuth } from '../hooks/useAuth'
import { AxiosError } from 'axios'
import { UseMutateFunction } from '@tanstack/react-query'

interface UserContextType {
    user?: User
    isAuthenticated: boolean
    isLoading: boolean
    login: UseMutateFunction<{ user: any; }, AxiosError<ApiError, any>, LoginCredentials, unknown>
    register: UseMutateFunction<User, AxiosError<ApiError, any>, RegisterCredentials, unknown>
    logout: UseMutateFunction<void, AxiosError<ApiError, any>, void, unknown>
    isRegistering: boolean
    isLoggingIn: boolean
    isLoggingOut: boolean
    loginError: FormattedError | null
    registerError: FormattedError | null
    logoutError: FormattedError | null
    googleAuthInitiate: UseMutateFunction<{ auth_url: string }, AxiosError<ApiError, any>, void, unknown>
    isGoogleAuthInitiatePending: boolean
    googleAuthInitiateError: FormattedError | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const {
        currentUser,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        isRegistering,
        isLoggingIn,
        isLoggingOut,
        loginError,
        registerError,
        logoutError,
        googleAuthInitiate,
        isGoogleAuthInitiatePending,
        googleAuthInitiateError
    } = useAuth()


    return (
        <UserContext.Provider
            value={{
                user: currentUser,
                isAuthenticated,
                isLoading,
                login,
                register,
                logout,
                isRegistering,
                isLoggingIn,
                isLoggingOut,
                loginError,
                registerError,
                logoutError,
                googleAuthInitiate,
                isGoogleAuthInitiatePending,
                googleAuthInitiateError
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
} 
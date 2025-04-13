import apiClient from '../api/client'
import { LoginCredentials, RegisterCredentials, ForgotPasswordCredentials, ResetPasswordCredentials, User } from '../hooks/types'
export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await apiClient.post('/core/users/login/', credentials)
        return response.data
    },
    register: async (userData: RegisterCredentials): Promise<User> => {
        const { data } = await apiClient.post('/core/users/', userData);
        return data;
    },

    logout: async () => {
        await apiClient.post('/core/users/logout/');
    },

    getCurrentUser: async (): Promise<User> => {
        const { data } = await apiClient.get('/core/users/me/');
        return data;
    },

    forgotPassword: async (credentials: ForgotPasswordCredentials) => {
        const { data } = await apiClient.post('/core/users/forgot-password/', credentials);
        return data;
    },

    resetPassword: async (credentials: ResetPasswordCredentials) => {
        const { data } = await apiClient.post('/core/users/reset-password/', credentials);
        return data;
    },

    updateUser: async (userData: Partial<User>) => {
        const { data } = await apiClient.put('/core/users/me/', userData);
        return data;
    },

    googleAuthInitiate: async () => {
        const { data } = await apiClient.get('/core/users/google-auth-initiate', {
            withCredentials: true
        })
        return data;
    }
}
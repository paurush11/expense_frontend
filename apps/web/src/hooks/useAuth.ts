import { useMutation } from "./useMutation";
import { useQuery } from "./useQuery"
import { authService } from "../services/authService";
import { useQueryClient } from "@tanstack/react-query";
import { LoginCredentials, RegisterCredentials, ForgotPasswordCredentials, ResetPasswordCredentials, User, FormattedError } from "./types";
import { useState } from "react";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const [loginError, setLoginError] = useState<FormattedError | null>(null)
    const [registerError, setRegisterError] = useState<FormattedError | null>(null)
    const [logoutError, setLogoutError] = useState<FormattedError | null>(null)
    const [forgotPasswordError, setForgotPasswordError] = useState<FormattedError | null>(null)
    const [resetPasswordError, setResetPasswordError] = useState<FormattedError | null>(null)
    const [googleAuthInitiateError, setGoogleAuthInitiateError] = useState<FormattedError | null>(null)
    const loginMutation = useMutation<{ user: any }, LoginCredentials>(authService.login, {

        showSuccessToast: true,
        showErrorToast: true,
        successMessage: 'Login successful',

        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            getCurrentUserQuery.refetch()
        },
        onError: (__, _, formattedError) => {
            setLoginError(formattedError)
        }
    });

    const registerMutation = useMutation<User, RegisterCredentials>(authService.register, {
        showSuccessToast: true,
        showErrorToast: true,
        successMessage: 'Register successful',
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
            getCurrentUserQuery.refetch()
        },
        onError: (__, _, formattedError) => {
            setRegisterError(formattedError)
        }
    });

    const logoutMutation = useMutation<void, void>(authService.logout, {
        showSuccessToast: true,
        showErrorToast: true,
        successMessage: 'Logout successful',
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            getCurrentUserQuery.refetch()
        },
        onError: (__, _, formattedError) => {
            setLogoutError(formattedError)
        }
    });

    const getCurrentUserQuery = useQuery<User>(['user'], authService.getCurrentUser, {
        showErrorToast: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    const forgotPasswordMutation = useMutation<void, ForgotPasswordCredentials>(authService.forgotPassword, {
        showSuccessToast: true,
        showErrorToast: true,
        successMessage: 'Password reset email sent',
        onError: (__, _, formattedError) => {
            setForgotPasswordError(formattedError)
        }
    });

    const resetPasswordMutation = useMutation<void, ResetPasswordCredentials>(authService.resetPassword, {
        showSuccessToast: true,
        showErrorToast: true,
        successMessage: 'Password reset successful',
        onError: (__, _, formattedError) => {
            setResetPasswordError(formattedError)
        }
    });

    const googleAuthInitiateMutation = useMutation<{ auth_url: string }, void>(authService.googleAuthInitiate, {
        showSuccessToast: false,
        showErrorToast: true,
        onSuccess: (data) => {
            // Redirect to Google's OAuth page
            queryClient.setQueryData(['user'], null);
            getCurrentUserQuery.refetch()
            window.location.href = data.auth_url;
        },
        onError: (__, _, formattedError) => {
            setGoogleAuthInitiateError(formattedError)
        }
    });


    return {
        currentUser: getCurrentUserQuery.data,
        isLoading: getCurrentUserQuery.isLoading,
        isAuthenticated: !!getCurrentUserQuery.data,
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginError,
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        registerError: registerError,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
        logoutError: logoutError,
        forgotPassword: forgotPasswordMutation.mutate,
        isForgotPasswordPending: forgotPasswordMutation.isPending,
        forgotPasswordError: forgotPasswordError,
        resetPassword: resetPasswordMutation.mutate,
        isResetPasswordPending: resetPasswordMutation.isPending,
        resetPasswordError: resetPasswordError,
        googleAuthInitiate: googleAuthInitiateMutation.mutate,
        isGoogleAuthInitiatePending: googleAuthInitiateMutation.isPending,
        googleAuthInitiateError: googleAuthInitiateError,
    }

}
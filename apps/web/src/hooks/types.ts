import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AxiosError } from "axios";

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export interface QueryOptions {
    showErrorToast?: boolean;
    errorMessage?: string;
    [key: string]: any;
}

export interface MutationOptions<TData, TVariables> {
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: AxiosError<ApiError>, variables: TVariables, formattedError: { message: string; fieldErrors?: Record<string, string[]> }) => void;
    [key: string]: any;
}

export interface FormattedError {
    message: string;
    fieldErrors?: Record<string, string[]>;
}

export interface LoginCredentials {
    email?: string;
    username?: string;
    password: string;
}

export interface RegisterCredentials {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    username: string;
    date_of_birth: string;
}

export interface ForgotPasswordCredentials {
    email: string;
}

export interface ResetPasswordCredentials {
    token: string;
    new_password: string;
}

export interface User {
    id: number
    email: string
    username: string
    first_name: string
    last_name: string
    phone_number?: string
    profile_picture?: string
    date_of_birth?: string
    address?: string
    city?: string
    state?: string
    country?: string
    zip_code?: string
    preferred_language?: string
    preferred_currency?: string
    is_active?: boolean
    is_verified?: boolean
    dummy_user?: boolean
}

export interface NavItem {
    icon: IconDefinition
    path: string
    label: string
}
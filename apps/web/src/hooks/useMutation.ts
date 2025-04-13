import { useMutation as useTanstackMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ApiError, MutationOptions, FormattedError } from './types'
import { toast } from 'react-hot-toast';


const formatErrorMessage = (errorData: any): FormattedError => {
    if (!errorData) return { message: 'An error occurred' };

    // If we have field-specific errors
    if (typeof errorData === 'object') {
        const fieldErrors = Object.entries(errorData).reduce((acc, [field, errors]) => {
            if (Array.isArray(errors)) {
                acc[field] = errors; // Keep the original array
            } else {
                acc[field] = [errors as string];
            }
            return acc;
        }, {} as Record<string, string[]>);

        // For toast message, we'll join them, but keep original arrays in fieldErrors
        const message = Object.entries(fieldErrors)
            .map(([field, errors]) => `${field}: ${errors[0]}`) // Show only first error in toast
            .join('\n');

        return {
            message,
            fieldErrors // Keep the original array structure
        };
    }

    return { message: String(errorData) };
};

export function useMutation<TData = unknown, TVariables = void, TError = AxiosError<ApiError>>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: MutationOptions<TData, TVariables>
) {
    const {
        showSuccessToast = true,
        showErrorToast = true,
        successMessage,
        errorMessage,
        onSuccess,
        onError,
        ...restOptions } = options || {};


    const result = useTanstackMutation<TData, TError, TVariables>({
        mutationFn,
        onSuccess: (data, variables) => {
            if (showSuccessToast && successMessage) {
                toast.success(successMessage);
            }
            if (onSuccess) {
                onSuccess(data, variables);
            }
        },

        onError: (error: TError, variables) => {
            if (showErrorToast) {
                const axiosError = error as AxiosError;
                const errorData = axiosError.response?.data;
                const formattedError = formatErrorMessage(errorData);

                if (onError) {
                    onError(axiosError as AxiosError<ApiError>, variables, formattedError);
                }

                toast.error(errorMessage || formattedError.message);
            }
        },

        ...restOptions,
    });

    return {
        ...result,
        formattedError: result.error
            ? formatErrorMessage((result.error as unknown as AxiosError).response?.data)
            : undefined
    }

}
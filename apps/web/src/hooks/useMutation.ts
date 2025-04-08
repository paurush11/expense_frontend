import { useMutation as useTanstackMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useMutation<TData = unknown, TVariables = unknown, TError = AxiosError>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
    return useTanstackMutation<TData, TError, TVariables>({
        mutationFn,
        ...options,
    })
} 
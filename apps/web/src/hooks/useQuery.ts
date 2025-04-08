import { useQuery as useTanstackQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useQuery<TData = unknown, TError = AxiosError>(
    queryKey: readonly unknown[],
    queryFn: () => Promise<TData>,
    options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
    return useTanstackQuery<TData, TError>({
        queryKey,
        queryFn,
        ...options,
    })
} 
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useWizard } from './StepsWizard';

export function useStepSubmit<TVars = any, TRes = any>(
    mutation?: UseMutationOptions<TRes, unknown, TVars>
) {
    const { update, next } = useWizard();
    const m = useMutation<TRes, unknown, TVars>({
        retry: 0,
        ...mutation,
        onSuccess: (res, vars, ctx) => {
            mutation?.onSuccess?.(res, vars, ctx);
            next(); // Go to next step only after success
        },
    });

    /** Wrap your submit handler */
    const submit = async (vars: TVars) => {
        update(vars); // merge into wizard global data
        if (mutation) await m.mutateAsync(vars);
        else next();
    };

    return { submit, ...m };
}

/* ----------------------------------------------------------- */
/** Read or default a field from wizard-wide state */
export function useFieldValue<T = any>(name: string, fallback: T = '' as unknown as T) {
    const { data } = useWizard();
    return (data[name] as T) ?? fallback;
} 
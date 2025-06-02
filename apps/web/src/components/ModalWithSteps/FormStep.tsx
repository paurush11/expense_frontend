import React, { useImperativeHandle, forwardRef, useRef, useCallback, useContext } from 'react';
import { useStepSubmit, useFieldValue } from './StepHelpers';
import { useWizard, PredefinedChoiceOption, WizardCtx } from './StepsWizard';

type FieldType =
    | 'text' | 'number' | 'email' | 'password' | 'date'
    | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';

export interface FieldSpec {
    id: string;
    label: string;
    type: FieldType;
    required?: boolean;
    options?: PredefinedChoiceOption[] | string;
    placeholder?: string;
    choiceKey?: string;
}

interface FormStepProps {
    title?: string;
    description?: string;
    fields: FieldSpec[];
    className?: string;
    /** optional tanstack mutation */
    mutation?: Parameters<typeof useStepSubmit>[0];
    /** For displaying cross-field validation errors or other general form errors */
    customError?: string;
}

export interface FormStepHandles {
    triggerSubmit: () => Promise<void>;
}

export const FormStep = forwardRef<FormStepHandles, FormStepProps>((
    { title, description, fields, mutation, className = '', customError },
    ref
) => {
    const { submit: stepSubmitter, isPending, isError, error } = useStepSubmit(mutation);
    const formRef = useRef<HTMLFormElement>(null);
    const wizardHook = useWizard();
    const wizardContext = useContext(WizardCtx);

    const handleFieldChange = useCallback((fieldId: string, value: any) => {
        wizardHook.update({ [fieldId]: value });
    }, [wizardHook]);

    const handleSubmitInternal = async () => {
        if (!formRef.current) return;
        const currentWizardData = wizardHook.data;
        const payloadToSubmit = fields.reduce((acc, field) => {
            if (currentWizardData.hasOwnProperty(field.id)) {
                acc[field.id] = currentWizardData[field.id];
            }
            return acc;
        }, {} as Record<string, any>);

        await stepSubmitter(payloadToSubmit);
    };

    useImperativeHandle(ref, () => ({
        triggerSubmit: handleSubmitInternal
    }));

    return (
        <form
            ref={formRef}
            className={`p-4 bg-[hsl(var(--input))] rounded-md shadow space-y-6 ${className}`}
        >
            {!!title && (
                <header className="space-y-2">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    {description && <p className="text-[hsl(var(--muted-foreground))]">{description}</p>}
                </header>
            )}

            {fields.map(f => {
                let fieldOptions: PredefinedChoiceOption[] | undefined = undefined;
                if (Array.isArray(f.options)) {
                    fieldOptions = f.options;
                } else if (wizardContext?.graph.choices) {
                    if (typeof f.options === 'string') {
                        fieldOptions = wizardContext.graph.choices[f.options];
                    } else if (f.choiceKey) {
                        fieldOptions = wizardContext.graph.choices[f.choiceKey];
                    }
                }

                return (
                    <div key={f.id} className="form-control grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <label htmlFor={f.id} className="label md:col-span-1 py-0 justify-start">
                            <span className="label-text text-base font-medium text-[hsl(var(--foreground))]">{f.label}</span>
                            {f.required && <span className="text-error ml-1">*</span>}
                        </label>
                        <div className="md:col-span-2">
                            {renderField(f, wizardHook.data[f.id], handleFieldChange, fieldOptions)}
                        </div>
                    </div>
                );
            })}

            {isError && (
                <p className="text-error text-sm">
                    {(error as Error)?.message ?? 'Something went wrong'}
                </p>
            )}

            {customError && (
                <p className="text-error text-sm font-semibold p-2 bg-error/10 rounded-md">
                    {customError}
                </p>
            )}
        </form>
    );
});

FormStep.displayName = 'FormStep';

/* helpers --------------------------------------------------------*/
function renderField(f: FieldSpec, currentValue: any, onChange: (fieldId: string, value: any) => void, resolvedOptions?: PredefinedChoiceOption[]) {
    const createChangeHandler = (isRadioOptionValue?: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = event.target;
        let value: string | number | boolean | File | null;
        if (isRadioOptionValue !== undefined) {
            value = isRadioOptionValue;
        } else if (target.type === 'checkbox') {
            value = (target as HTMLInputElement).checked;
        } else if (target.type === 'file') {
            value = (target as HTMLInputElement).files ? (target as HTMLInputElement).files![0] : null;
        } else if (target.type === 'number') {
            value = target.value === '' ? null : parseFloat(target.value);
        } else {
            value = target.value;
        }
        onChange(f.id, value);
    };

    switch (f.type) {
        case 'textarea':
            return (
                <textarea
                    id={f.id}
                    name={f.id}
                    value={currentValue ?? ''}
                    onChange={createChangeHandler()}
                    placeholder={f.placeholder}
                    required={f.required}
                    className="textarea textarea-bordered w-full"
                />
            );

        case 'select':
            return (
                <select
                    id={f.id}
                    name={f.id}
                    value={currentValue ?? ''}
                    onChange={createChangeHandler()}
                    required={f.required}
                    className="select select-bordered w-full"
                >
                    <option value="" disabled>
                        {f.placeholder ?? 'Select'}
                    </option>
                    {(resolvedOptions || []).map(o => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
            );

        case 'checkbox':
            return (
                <input
                    type="checkbox"
                    id={f.id}
                    name={f.id}
                    checked={!!currentValue}
                    onChange={createChangeHandler()}
                    className="checkbox"
                />
            );

        case 'radio':
            return (
                <div className="flex gap-4">
                    {(resolvedOptions || []).map(o => (
                        <label key={o.value} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name={f.id}
                                value={o.value}
                                checked={currentValue === o.value}
                                onChange={createChangeHandler(o.value)}
                                className="radio"
                            />
                            {o.label}
                        </label>
                    ))}
                </div>
            );

        case 'file':
            return (
                <input
                    type="file"
                    id={f.id}
                    name={f.id}
                    accept={f.placeholder}
                    onChange={createChangeHandler()}
                    className="file-input file-input-bordered w-full"
                />
            );

        default:
            /* text / number / email / date / password */
            return (
                <input
                    id={f.id}
                    name={f.id}
                    type={f.type}
                    value={currentValue ?? ''}
                    onChange={createChangeHandler()}
                    placeholder={f.placeholder}
                    required={f.required}
                    className="input input-bordered w-full"
                />
            );
    }
} 
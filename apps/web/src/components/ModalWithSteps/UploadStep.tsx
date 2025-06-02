import React from 'react';
import { useStepSubmit, useFieldValue } from './StepHelpers';

interface UploadStepProps {
    title?: string;
    description?: string;
    accept?: string;
    maxSize?: number; // bytes
    preview?: React.ComponentType<{ file: File }>;
    className?: string;
    mutation?: Parameters<typeof useStepSubmit<File>>[0];
}

export function UploadStep({
    title,
    description,
    accept = 'image/*',
    maxSize = 5 * 1024 * 1024,
    preview: Preview,
    mutation,
    className = '',
}: UploadStepProps) {
    const initial = useFieldValue<File | null>('file', null);
    const [file, setFile] = React.useState<File | null>(initial);
    const [err, setErr] = React.useState<string | null>(null);
    const { submit, isPending } = useStepSubmit<File>(mutation);

    const pickFile: React.ChangeEventHandler<HTMLInputElement> = e => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > maxSize) {
            setErr(`Max size ${maxSize / 1024 / 1024} MB`);
            return;
        }
        setErr(null);
        setFile(f);
    };

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                if (!file) return setErr('Select a file first');
                submit(file);
            }}
            className={`space-y-6 ${className}`}
        >
            {!!title && (
                <header className="space-y-2">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    {description && <p className="text-[hsl(var(--muted-foreground))]">{description}</p>}
                </header>
            )}

            <input
                type="file"
                accept={accept}
                onChange={pickFile}
                className="file-input file-input-bordered w-full"
            />
            {err && <p className="text-error text-sm">{err}</p>}

            {file && Preview && (
                <div className="rounded border p-4">
                    <Preview file={file} />
                </div>
            )}

            <div className="flex justify-end">
                <button className="btn btn-primary" disabled={!file || isPending}>
                    {isPending ? 'Uploading…' : 'Continue'}
                </button>
            </div>
        </form>
    );
} 
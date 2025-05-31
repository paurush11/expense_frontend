import React, { useRef, useState } from 'react';

interface ImageUploadStepProps {
    data?: any;
    onSubmit?: (data: any) => void;
    onBack?: () => void;
}

interface UploadedFile {
    name: string;
    url: string;
    type: string;
}

function truncateFileName(name: string, maxLength = 24) {
    if (name.length <= maxLength) return name;
    const ext = name.includes('.') ? '.' + name.split('.').pop() : '';
    return name.slice(0, maxLength - ext.length - 3) + '...' + ext;
}

export function ImageUploadStep({ data, onSubmit }: ImageUploadStepProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<UploadedFile[]>(data?.uploadedFiles || []);
    const [showContinuePrompt, setShowContinuePrompt] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const newFiles: UploadedFile[] = [];
        let filesProcessed = 0;
        selectedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                newFiles.push({
                    name: file.name,
                    url: reader.result as string,
                    type: file.type,
                });
                filesProcessed++;
                if (filesProcessed === selectedFiles.length) {
                    const updatedFiles = [...files, ...newFiles];
                    setFiles(updatedFiles);
                    onSubmit?.({ uploadedFiles: updatedFiles });
                    setShowContinuePrompt(true);
                }
            };
            if (file.type.startsWith('image/')) {
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                reader.readAsDataURL(file);
            }
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRemove = (idx: number) => {
        const updatedFiles = files.filter((_, i) => i !== idx);
        setFiles(updatedFiles);
        onSubmit?.({ uploadedFiles: updatedFiles });
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleContinue = () => {
        setShowContinuePrompt(false);
        onSubmit?.({ uploadedFiles: files });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Upload Receipts (Images or PDFs)</h2>
            <button
                type="button"
                onClick={handleUploadClick}
                className="btn btn-primary"
                disabled={showContinuePrompt}
            >
                Upload Files
            </button>
            <input
                type="file"
                accept="image/*,application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
            />
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-4 max-w-full">
                            {file.type.startsWith('image/') ? (
                                <img src={file.url} alt={file.name} className="w-20 h-20 object-cover rounded border" />
                            ) : file.type === 'application/pdf' ? (
                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline max-w-[160px] truncate">
                                    {truncateFileName(file.name)}
                                </a>
                            ) : null}
                            <span className="text-sm text-[hsl(var(--foreground))] max-w-[160px] truncate">{truncateFileName(file.name)}</span>
                            <button
                                type="button"
                                onClick={() => handleRemove(idx)}
                                className="btn btn-ghost text-red-500 flex-shrink-0"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {showContinuePrompt && (
                <div className="flex gap-4 mt-4">
                    <button
                        type="button"
                        onClick={handleUploadClick}
                        className="btn btn-outline"
                    >
                        Add More
                    </button>
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="btn btn-success"
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
} 
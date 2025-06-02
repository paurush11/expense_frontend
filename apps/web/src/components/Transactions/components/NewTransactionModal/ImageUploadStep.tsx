import React from 'react';
import { UploadStep } from '../../../../components/ModalWithSteps/UploadStep';

// Preview component for the uploaded image
function ImagePreview({ file }: { file: File }) {
    const [preview, setPreview] = React.useState<string | null>(null);

    React.useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }, [file]);

    if (!preview) return null;

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <img
                src={preview}
                alt="Receipt preview"
                className="h-full w-full object-contain"
            />
        </div>
    );
}

export function ImageUploadStep() {
    return (
        <UploadStep
            title="Upload Receipt"
            description="Upload an image of your receipt for AI processing"
            accept="image/*"
            maxSize={10 * 1024 * 1024} // 10MB
            preview={ImagePreview}
        />
    );
} 
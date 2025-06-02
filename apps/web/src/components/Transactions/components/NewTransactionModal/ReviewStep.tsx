import React from 'react';
import { FormStep, FieldSpec } from '../../../../components/ModalWithSteps/FormStep';
import { useWizard } from '../../../../components/ModalWithSteps/StepsWizard'; // For accessing wizard.data if needed for complex logic

// Assuming TransactionData is similar to what's in NewTransactionModal/index.tsx
// You might want to import it or define a relevant subset here.
interface TransactionData {
    choice?: string;
    expenseType?: 'individual' | 'group';
    amount?: number;
    description?: string;
    category?: string;
    date?: string;
    paymentMethod?: string;
    location?: string;
    notes?: string;
    tags?: string[]; // Representing tags as a comma-separated string for simple editing in a text field
    members?: Array<{ name: string; share: number }>; // Group members might be complex to edit in a generic form
    imageUrl?: string;
    // Fields from AI analysis or other steps might also be here
}

interface ReviewStepProps {
    data: TransactionData; // Comes from the wizard
}

export function ReviewStep({ data }: ReviewStepProps) {
    const wizard = useWizard(); // Access to wizard.update if needed for more complex interactions beyond FormStep

    // Dynamically generate FieldSpec[] for FormStep based on wizard.data
    // This is a simplified example; you'll need to tailor it to your data and desired review experience.
    const reviewFields: FieldSpec[] = [];

    if (data) {
        if (typeof data.amount === 'number') {
            reviewFields.push({ id: 'amount', label: 'Amount', type: 'number', required: true });
        }
        if (typeof data.description === 'string') {
            reviewFields.push({ id: 'description', label: 'Description', type: 'textarea', required: true });
        }
        if (typeof data.category === 'string') {
            // Assuming categories are pre-loaded or you have a fixed list for review
            // For simplicity, making it a text field here. For a select, options would be needed.
            reviewFields.push({ id: 'category', label: 'Category', type: 'text', required: true });
        }
        if (typeof data.date === 'string') {
            reviewFields.push({ id: 'date', label: 'Date', type: 'date', required: true });
        }
        if (typeof data.paymentMethod === 'string') {
            reviewFields.push({ id: 'paymentMethod', label: 'Payment Method', type: 'text' });
        }
        if (typeof data.location === 'string') {
            reviewFields.push({ id: 'location', label: 'Location', type: 'text' });
        }
        if (data.tags && Array.isArray(data.tags)) {
            // For simplicity, editing tags as a comma-separated string.
            // FormStep's controlled input will update wizard.data.tags with this string.
            // You might need to parse it back into an array in your final onSubmit handler if necessary.
            reviewFields.push({ id: 'tags', label: 'Tags (comma-separated)', type: 'text' });
        }
        if (typeof data.notes === 'string') {
            reviewFields.push({ id: 'notes', label: 'Notes', type: 'textarea' });
        }
        // Add other fields from TransactionData as needed
        // For group expenses (data.members), a simple form representation is tricky.
        // You might display them as read-only or provide a more specialized editing component if deep editing is needed here.
        // For imageUrl, typically you'd show the image and maybe an option to remove/re-upload, which is beyond simple FormStep.
    }

    // If there's an image, display it above the form.
    const imageUrl = data?.imageUrl;

    return (
        <div className="space-y-6">
            {imageUrl && (
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-[hsl(var(--foreground))]">Receipt Image</h3>
                    <div className="aspect-video bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                        <img
                            src={imageUrl}
                            alt="Receipt"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </div>
            )}
            <FormStep
                // title="Review and Confirm" // Title is already provided by the wizard step title
                fields={reviewFields}
            // No mutation needed here if FormStep just updates wizard.data
            // The actual submission is handled by StepsModal's onSubmit
            />
            {/* The "Edit" button is removed. Editing happens in place.
                The modal's main "Submit" button (from the footer) will be used. */}
        </div>
    );
} 
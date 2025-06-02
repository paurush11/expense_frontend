import { FormStep } from '../../../../components/ModalWithSteps/FormStep';

export function AdditionalDetailsStep() {
    return (
        <FormStep
            title="Additional Details"
            description="Add any additional information about your expense"
            fields={[
                {
                    id: 'paymentMethod',
                    label: 'Payment Method',
                    type: 'select',
                    required: true,
                    options: [
                        { value: 'cash', label: 'Cash' },
                        { value: 'credit', label: 'Credit Card' },
                        { value: 'debit', label: 'Debit Card' },
                        { value: 'upi', label: 'UPI' },
                        { value: 'bank', label: 'Bank Transfer' },
                        { value: 'other', label: 'Other' },
                    ],
                    placeholder: 'Select payment method',
                },
                {
                    id: 'location',
                    label: 'Location',
                    type: 'text',
                    placeholder: 'Enter location (optional)',
                },
                {
                    id: 'tags',
                    label: 'Tags',
                    type: 'text',
                    placeholder: 'Enter tags separated by commas (optional)',
                },
                {
                    id: 'notes',
                    label: 'Additional Notes',
                    type: 'textarea',
                    placeholder: 'Enter any additional notes (optional)',
                },
            ]}
        />
    );
} 
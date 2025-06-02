import React from 'react';
import { FormStep } from '../../../../components/ModalWithSteps/FormStep';

// Assuming TransactionData interface is accessible or defined similarly elsewhere
// For simplicity, we might not need to explicitly type props if FormStep handles data via wizard

export function MainExpenseDetailsStep() {
    // No specific logic needed here if FormStep handles everything via wizard.data and choiceKeys

    return (
        <FormStep
            // title="Core Expense Details" // Title can be set by the wizard node definition
            // description="Please provide the main details for this expense."
            fields={[
                {
                    id: 'amount',
                    label: 'Amount',
                    type: 'number',
                    required: true,
                    placeholder: '0.00',
                },
                {
                    id: 'description',
                    label: 'Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'e.g., Lunch with client',
                },
                {
                    id: 'category',
                    label: 'Category',
                    type: 'select',
                    required: true,
                    choiceKey: 'categories', // From graph definition
                    placeholder: 'Select a category',
                },
                {
                    id: 'date',
                    label: 'Date of Expense',
                    type: 'date',
                    required: true,
                },
            ]}
        />
    );
} 
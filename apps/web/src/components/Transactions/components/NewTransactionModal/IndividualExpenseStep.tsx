import React from 'react';
// import { useQuery } from '@tanstack/react-query';
import { FormStep } from '../../../../components/ModalWithSteps/FormStep';

export function IndividualExpenseStep() {
    // const { data: categoriesFromAPI } = useQuery(...); // Old way

    return (
        <FormStep
            title="Expense Details"
            description="Enter the details of your expense"
            fields={[
                {
                    id: 'amount',
                    label: 'Amount',
                    type: 'number',
                    required: true,
                    placeholder: 'Enter amount',
                },
                {
                    id: 'category',
                    label: 'Category',
                    type: 'select',
                    required: true,
                    choiceKey: 'categories', // Use the choiceKey defined in the graph builder
                    // options: categoriesFromAPI?.map(...) || [], // Remove direct options population
                    placeholder: 'Select a category',
                },
                {
                    id: 'description',
                    label: 'Description',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Enter expense description',
                },
                {
                    id: 'date',
                    label: 'Date',
                    type: 'date',
                    required: true,
                },
                {
                    id: 'paymentMethod', // Example: Adding payment method
                    label: 'Payment Method',
                    type: 'select',
                    required: false, // Or true, as needed
                    choiceKey: 'paymentMethods',
                    placeholder: 'Select payment method',
                },
            ]}
        />
    );
} 
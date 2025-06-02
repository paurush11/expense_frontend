import React, { useState } from 'react';
import {
    StepsModal
} from '../../../ModalWithSteps/StepsModal';
import {
    WizardGraph,
    WizardGraphBuilder,
    generateMermaidDiagramFromBuilder,
    PredefinedChoiceOption,
} from '../../../ModalWithSteps/StepsWizard';

import { TransactionTypeStep } from './TransactionTypeStep';
import { ExpenseTypeStep } from './ExpenseTypeStep';
import { MainExpenseDetailsStep } from './MainExpenseDetailsStep';
import { OptionalDetailsStep } from './OptionalDetailsStep';
import { GroupSplitConfigStep, GroupSplitConfigData as GroupSplitDataType } from './GroupSplitConfigStep';
import { ReviewStep } from './ReviewStep';
import { ImageUploadStep } from './ImageUploadStep';
import { AIAnalysisStep } from './AIAnalysisStep';

interface TransactionData extends GroupSplitDataType {
    choice?: 'manual' | 'image';
    expenseType?: 'individual' | 'group';
    amount?: number;
    description?: string;
    category?: string;
    date?: string;
    paymentMethod?: string;
    location?: string;
    notes?: string;
    tags?: string;
    imageUrl?: string;
    analysisComplete?: boolean;
    confirmed?: boolean;
    tax?: number;
    tip?: number;
    discount?: number;
}

const categoryChoices: PredefinedChoiceOption[] = [
    { value: 'food', label: 'Food & Dining' },
    { value: 'transport', label: 'Transportation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'gifts', label: 'Gifts & Donations' },
    { value: 'personal_care', label: 'Personal Care' },
    { value: 'travel', label: 'Travel' },
    { value: 'subscriptions', label: 'Subscriptions & Memberships' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'home', label: 'Home & Rent/Mortgage' },
    { value: 'clothing', label: 'Clothing & Accessories' },
    { value: 'pets', label: 'Pets' },
    { value: 'other', label: 'Other' },
];

const paymentMethodChoices: PredefinedChoiceOption[] = [
    { value: 'cash', label: 'Cash' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'mobile_payment', label: 'Mobile Payment (e.g., Apple Pay, Google Pay)' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'venmo', label: 'Venmo' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'check', label: 'Check' },
    { value: 'other', label: 'Other' },
];

const builder = new WizardGraphBuilder<TransactionData>()
    .addChoiceSet('categories', categoryChoices)
    .addChoiceSet('paymentMethods', paymentMethodChoices)
    .addNode('transactionType', TransactionTypeStep, { title: 'How to add transaction?' })
    .addNode('imageUpload', ImageUploadStep, { title: 'Upload Receipt' })
    .addNode('aiAnalysis', AIAnalysisStep, { title: 'Analyzing Receipt...' })
    .addNode('expenseType', ExpenseTypeStep, { title: 'What type of expense?' })
    .addNode('mainExpenseDetails', MainExpenseDetailsStep, { title: 'Enter Expense Details' })
    .addNode('groupSplitConfig', GroupSplitConfigStep, { title: 'Configure Group Split' })
    .addNode('optionalDetails', OptionalDetailsStep, { title: 'Optional Details' })
    .addNode('review', ReviewStep, { title: 'Review Transaction', isTerminal: true })

    .setStartNode('transactionType')

    .addConditionalEdge('transactionType', 'expenseType', data => data.choice === 'manual')
    .addConditionalEdge('expenseType', 'mainExpenseDetails',
        data => data.expenseType === 'individual' || data.expenseType === 'group'
    )
    .addConditionalEdge('mainExpenseDetails', 'optionalDetails', data => {
        return data.expenseType === 'individual' &&
            !!data.amount && !!data.description && !!data.category && !!data.date;
    })
    .addDefaultEdge('optionalDetails', 'review')

    .addConditionalEdge('mainExpenseDetails', 'groupSplitConfig', data => {
        return data.expenseType === 'group' &&
            !!data.amount && !!data.description && !!data.category && !!data.date;
    })
    .addConditionalEdge('groupSplitConfig', 'optionalDetails', data => {
        return !!data.isSplitValid;
    })

    .addConditionalEdge('transactionType', 'imageUpload', data => data.choice === 'image')
    .addDefaultEdge('imageUpload', 'aiAnalysis')
    .addDefaultEdge('aiAnalysis', 'review');

const transactionGraph: WizardGraph = builder.build();
const mermaidOutput = generateMermaidDiagramFromBuilder(builder);
console.log("Mermaid Diagram (from Builder):\n", mermaidOutput);

const handleSubmitWizard = (data: TransactionData) => {
    console.log("Wizard Submitted Data:", data);
    if (data.expenseType === 'group') {
        console.log("Validating group expense details...");
    }
};

export function NewTransactionModal() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="btn btn-success text-sm text-[hsl(var(--card))] p-2 rounded-lg"
            >
                New Transaction
            </button>
            <StepsModal
                isOpen={isOpen}
                onClose={handleClose}
                graph={transactionGraph}
                onSubmit={handleSubmitWizard}
            />
        </>
    );
} 
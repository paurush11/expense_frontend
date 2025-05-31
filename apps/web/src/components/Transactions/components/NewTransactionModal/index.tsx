import React, { useState } from 'react';
import { StepsModal } from '../../../ModalWithSteps/StepsModal';
import { TransactionTypeStep } from './TransactionTypeStep';
import { ExpenseTypeStep } from './ExpenseTypeStep';
import { IndividualExpenseStep } from './IndividualExpenseStep';
import { GroupExpenseStep } from './GroupExpenseStep';
import { AdditionalDetailsStep } from './AdditionalDetailsStep';
import { ReviewStep } from './ReviewStep';
import { ImageUploadStep } from './ImageUploadStep';
import { AIAnalysisStep } from './AIAnalysisStep';

// Step IDs
type StepId =
    | 'transactionType'
    | 'expenseType'
    | 'individualExpense'
    | 'groupExpense'
    | 'additionalDetails'
    | 'review'
    | 'imageUpload'
    | 'aiAnalysis';

interface StepNode {
    id: StepId;
    title: string;
    component: React.ComponentType<any>;
    next: (data: any) => StepId | null;
    prev?: StepId[];
}

const stepGraph: Record<StepId, StepNode> = {
    transactionType: {
        id: 'transactionType',
        title: 'Transaction Type',
        component: TransactionTypeStep,
        next: (data) => (data.transactionType === 'image' ? 'imageUpload' : 'expenseType'),
    },
    imageUpload: {
        id: 'imageUpload',
        title: 'Upload Receipt',
        component: ImageUploadStep,
        next: () => 'aiAnalysis',
        prev: ['transactionType'],
    },
    expenseType: {
        id: 'expenseType',
        title: 'Expense Type',
        component: ExpenseTypeStep,
        next: (data) => (data.expenseType === 'group' ? 'groupExpense' : 'individualExpense'),
        prev: ['transactionType'],
    },
    individualExpense: {
        id: 'individualExpense',
        title: 'Expense Details',
        component: IndividualExpenseStep,
        next: () => 'additionalDetails',
        prev: ['expenseType'],
    },
    groupExpense: {
        id: 'groupExpense',
        title: 'Group Details',
        component: GroupExpenseStep,
        next: () => 'additionalDetails',
        prev: ['expenseType'],
    },
    additionalDetails: {
        id: 'additionalDetails',
        title: 'Additional Details',
        component: AdditionalDetailsStep,
        next: () => 'aiAnalysis',
        prev: ['individualExpense', 'groupExpense'],
    },
    aiAnalysis: {
        id: 'aiAnalysis',
        title: 'AI Analysis',
        component: AIAnalysisStep,
        next: () => 'review',
        prev: ['imageUpload', 'additionalDetails'],
    },
    review: {
        id: 'review',
        title: 'Review',
        component: ReviewStep,
        next: () => null,
        prev: ['aiAnalysis'],
    },
};

const orderedSteps: StepId[] = [
    'transactionType',
    'imageUpload',
    'expenseType',
    'individualExpense',
    'groupExpense',
    'additionalDetails',
    'aiAnalysis',
    'review',
];

export function NewTransactionModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [currentStep, setCurrentStep] = useState<StepId>('transactionType');

    // For progress bar: which steps are enabled based on data
    const getEnabledSteps = () => {
        const enabled: StepId[] = ['transactionType'];
        let data = { ...formData };
        let step: StepId = 'transactionType';
        while (true) {
            const next: StepId | null = stepGraph[step].next(data);
            if (!next || enabled.includes(next)) break;
            enabled.push(next);
            step = next;
        }
        return enabled;
    };

    const enabledSteps = getEnabledSteps();

    const handleSubmit = (data: any) => {
        setIsOpen(false);
        setFormData({});
        setCurrentStep('transactionType');
        console.log('Final transaction data:', data);
    };

    // When Edit is clicked in ReviewStep, jump to the first enabled step (after transactionType)
    const handleEditStep = () => {
        const firstEditable = enabledSteps.find((s) => s !== 'review' && s !== 'transactionType');
        setCurrentStep(firstEditable || 'transactionType');
    };

    const handleOpen = () => {
        setFormData({});
        setCurrentStep('transactionType');
        setIsOpen(true);
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="btn btn-success text-sm text-[hsl(var(--card))] p-2 rounded-lg"
            >
                New Transaction
            </button>

            <StepsModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                stepGraph={stepGraph}
                orderedSteps={orderedSteps}
                currentStep={currentStep}
                setCurrentStep={(step) => setCurrentStep(step as StepId)}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                title="New Transaction"
                showProgress={true}
                showSkip={true}
                onEditStep={handleEditStep}
            />
        </>
    );
} 
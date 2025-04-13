import { useState } from 'react'
import { ExpenseFormData } from '../../types/expense'
import { BasicInfoStep } from './steps/BasicInfoStep'
import { SplitTypeStep } from './steps/SplitTypeStep'
import { ParticipantsStep } from './steps/ParticipantsStep'
import { PaymentStep } from './steps/PaymentStep'
import { ReviewStep } from './steps/ReviewStep'

interface ExpenseFormProps {
    onClose: () => void
}

export const ExpenseForm = ({ onClose }: ExpenseFormProps) => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<Partial<ExpenseFormData>>({})

    const handleNext = (data: Partial<ExpenseFormData>) => {
        const newData = { ...formData, ...data }
        setFormData(newData)

        if (step < 5) {
            setStep(step + 1)
        } else {
            // Handle form submission
            console.log('Form submitted:', newData)
            onClose()
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <BasicInfoStep onNext={handleNext} initialData={formData} />
            case 2:
                return <SplitTypeStep onNext={handleNext} onBack={handleBack} initialData={formData} />
            case 3:
                return <ParticipantsStep onNext={handleNext} onBack={handleBack} initialData={formData} />
            case 4:
                return <PaymentStep onNext={handleNext} onBack={handleBack} initialData={formData} />
            case 5:
                return <ReviewStep onNext={handleNext} onBack={handleBack} initialData={formData} />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-[hsl(var(--foreground))]">
                    Step {step} of 5
                </h3>
                <button
                    onClick={onClose}
                    className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                >
                    ×
                </button>
            </div>
            {renderStep()}
        </div>
    )
} 
import { useState } from 'react'
import { useUser } from '../../providers/UserProvider'
import { User } from '../../hooks/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons'

interface StepProps {
    onNext: (data: Partial<User>) => void
    onBack?: () => void
    initialData?: Partial<User>
}

interface WelcomeFlowProps {
    onComplete: () => void
}

const PersonalInfoStep = ({ onNext, initialData }: StepProps) => {
    const [formData, setFormData] = useState<Partial<User>>(initialData || {})
    const [photo, setPhoto] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhoto(reader.result as string)
                setFormData(prev => ({ ...prev, photo: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-[hsl(var(--muted))]">
                        {photo ? (
                            <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faCamera} className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
                            </div>
                        )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] p-2 rounded-full cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <FontAwesomeIcon icon={faCamera} className="w-4 h-4" />
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Name</label>
                    <input
                        type="text"
                        value={formData.first_name || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-2 text-[hsl(var(--foreground))]"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Email</label>
                    <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-2 text-[hsl(var(--foreground))]"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Date of Birth</label>
                    <input
                        type="date"
                        value={formData.date_of_birth || ''}
                        onChange={(e) => {
                            const dob = e.target.value
                            const age = new Date().getFullYear() - new Date(dob).getFullYear()
                            setFormData(prev => ({ ...prev, date_of_birth: dob, age }))
                        }}
                        className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-2 text-[hsl(var(--foreground))]"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90"
                >
                    Next
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
            </div>
        </form>
    )
}

const AdditionalInfoStep = ({ onNext, onBack, initialData }: StepProps) => {
    const [formData, setFormData] = useState<Partial<User>>(initialData || {})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Currency Preference</label>
                    <select
                        value={'USD'}
                        onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value as 'USD' | 'EUR' | 'GBP' }))}
                        className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-2 text-[hsl(var(--foreground))]"
                    >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Monthly Budget</label>
                    <input
                        type="number"
                        value={''}
                        onChange={(e) => setFormData(prev => ({ ...prev, monthlyBudget: Number(e.target.value) }))}
                        className="mt-1 block w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-2 text-[hsl(var(--foreground))]"
                        placeholder="Enter your monthly budget"
                    />
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center px-4 py-2 border border-[hsl(var(--border))] text-sm font-medium rounded-md text-[hsl(var(--foreground))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))]"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90"
                >
                    Complete Setup
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
            </div>
        </form>
    )
}

export const WelcomeFlow = ({ onComplete }: WelcomeFlowProps) => {
    // const { updateUser } = useUser()
    const updateUser = async (user: User) => {
        console.log(user)
    }
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<Partial<User>>({})

    const handleNext = (data: Partial<User>) => {
        const newData = { ...formData, ...data }
        setFormData(newData)

        if (step === 1) {
            setStep(2)
        } else {
            // Final step - save all data
            updateUser(newData as User)
            onComplete()
        }
    }

    const handleBack = () => {
        setStep(1)
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-[hsl(var(--card))] rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">Welcome! Let's get started</h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-6">
                {step === 1 ? 'Tell us a bit about yourself' : 'Set up your preferences'}
            </p>

            {step === 1 ? (
                <PersonalInfoStep onNext={handleNext} initialData={formData} />
            ) : (
                <AdditionalInfoStep onNext={handleNext} onBack={handleBack} initialData={formData} />
            )}
        </div>
    )
} 
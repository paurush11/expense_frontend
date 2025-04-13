import { useState } from 'react'
import { ExpenseFormData } from '../../../types/expense'

interface ParticipantsStepProps {
    onNext: (data: Partial<ExpenseFormData>) => void
    onBack: () => void
    initialData?: Partial<ExpenseFormData>
}

export const ParticipantsStep = ({ onNext, onBack, initialData }: ParticipantsStepProps) => {
    const [participants, setParticipants] = useState<{ id: string; name: string }[]>(
        initialData?.participants || [{ id: '1', name: '' }]
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const participantData = participants.map((p, index) => ({
            id: p.id,
            name: formData.get(`name-${index}`) as string
        }))
        onNext({ participants: participantData })
    }

    const addParticipant = () => {
        setParticipants([...participants, { id: Date.now().toString(), name: '' }])
    }

    const removeParticipant = (id: string) => {
        setParticipants(participants.filter(p => p.id !== id))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-[hsl(var(--foreground))]">
                    Add participants
                </label>
                <div className="mt-2 space-y-2">
                    {participants.map((participant, index) => (
                        <div key={participant.id} className="flex items-center space-x-2">
                            <input
                                type="text"
                                name={`name-${index}`}
                                defaultValue={participant.name}
                                required
                                placeholder="Participant name"
                                className="flex-1 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[hsl(var(--foreground))]"
                            />
                            {participants.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeParticipant(participant.id)}
                                    className="rounded-md bg-[hsl(var(--destructive))] px-2 py-1 text-sm font-medium text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive))]/90"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addParticipant}
                    className="mt-2 rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                >
                    Add Participant
                </button>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="rounded-md border border-[hsl(var(--border))] px-4 py-2 text-sm font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90"
                >
                    Next
                </button>
            </div>
        </form>
    )
} 
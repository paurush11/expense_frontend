import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

interface GroupExpenseStepProps {
    data?: any;
    onSubmit?: (data: any) => void;
}

interface GroupMember {
    id: string;
    name: string;
    share: number;
}

export function GroupExpenseStep({ data, onSubmit }: GroupExpenseStepProps) {
    const [members, setMembers] = useState<GroupMember[]>([
        { id: '1', name: '', share: 0 }
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const expenseData = {
            totalAmount: formData.get('totalAmount'),
            description: formData.get('description'),
            date: formData.get('date'),
            members: members.map(member => ({
                name: member.name,
                share: member.share
            }))
        };
        onSubmit?.(expenseData);
    };

    const addMember = () => {
        setMembers([...members, { id: Date.now().toString(), name: '', share: 0 }]);
    };

    const removeMember = (id: string) => {
        setMembers(members.filter(member => member.id !== id));
    };

    const updateMember = (id: string, field: keyof GroupMember, value: string | number) => {
        setMembers(members.map(member =>
            member.id === id ? { ...member, [field]: value } : member
        ));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Group Expense Details</h2>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="totalAmount" className="text-sm font-medium text-[hsl(var(--foreground))]">Total Amount</label>
                    <input
                        id="totalAmount"
                        name="totalAmount"
                        type="number"
                        step="0.01"
                        required
                        placeholder="Enter total amount"
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-[hsl(var(--foreground))]">Description</label>
                    <input
                        id="description"
                        name="description"
                        required
                        placeholder="Enter expense description"
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium text-[hsl(var(--foreground))]">Date</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-[hsl(var(--foreground))]">Group Members</label>
                        <button
                            type="button"
                            onClick={addMember}
                            className="btn btn-outline text-sm p-2 rounded-lg"
                        >
                            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                            Add Member
                        </button>
                    </div>

                    {members.map((member) => (
                        <div key={member.id} className="flex gap-4 items-start">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium text-[hsl(var(--foreground))]">Member Name</label>
                                <input
                                    value={member.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateMember(member.id, 'name', e.target.value)}
                                    placeholder="Enter member name"
                                    required
                                    className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium text-[hsl(var(--foreground))]">Share Amount</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={member.share}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateMember(member.id, 'share', parseFloat(e.target.value))}
                                    placeholder="Enter share amount"
                                    required
                                    className="w-full p-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
                                />
                            </div>
                            {members.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeMember(member.id)}
                                    className="btn btn-ghost p-2 mt-8"
                                >
                                    <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
} 
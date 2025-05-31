import React from 'react';

export function AdditionalExpenseStep({ onDataChange, initialData }) {
    const [splitType, setSplitType] = React.useState(initialData?.splitType || 'equal');
    const [others, setOthers] = React.useState(initialData?.others || []);
    const [input, setInput] = React.useState('');

    const handleAddOther = () => {
        if (input.trim()) {
            const updated = [...others, input.trim()];
            setOthers(updated);
            setInput('');
            onDataChange({ splitType, others: updated });
        }
    };

    const handleRemoveOther = (idx) => {
        const updated = others.filter((_, i) => i !== idx);
        setOthers(updated);
        onDataChange({ splitType, others: updated });
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[hsl(var(--foreground))]">Split Expense</h3>
            <div>
                <label className="block mb-1 font-medium">Split Type</label>
                <select
                    value={splitType}
                    onChange={e => { setSplitType(e.target.value); onDataChange({ splitType: e.target.value, others }); }}
                    className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] focus:outline-none"
                >
                    <option value="equal">Equal</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            <div>
                <label className="block mb-1 font-medium">Add Others</label>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] focus:outline-none"
                        placeholder="Enter email or name"
                    />
                    <button
                        type="button"
                        onClick={handleAddOther}
                        className="btn btn-primary px-4 py-2 rounded-lg"
                    >
                        Add
                    </button>
                </div>
                <ul className="mt-2 space-y-1">
                    {others.map((other, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-[hsl(var(--muted))] px-3 py-2 rounded">
                            <span>{other}</span>
                            <button onClick={() => handleRemoveOther(idx)} className="text-red-500 hover:underline">Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 
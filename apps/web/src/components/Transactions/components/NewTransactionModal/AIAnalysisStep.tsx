import React from 'react';

interface AIAnalysisStepProps {
    data?: any;
    onSubmit?: (data: any) => void;
    onBack?: () => void;
}

export function AIAnalysisStep({ data }: AIAnalysisStepProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">AI Receipt Analysis</h2>
            <div className="p-4 bg-[hsl(var(--muted))] rounded-lg">
                <p className="text-[hsl(var(--foreground))]">Running AI analysis on your receipt...</p>
            </div>
        </div>
    );
} 
import React, { useCallback, useEffect, useMemo } from 'react';
import { useWizard } from '../../../ModalWithSteps/StepsWizard';

// Interface for the data this step manages within the wizard
export interface GroupSplitConfigData {
    splitType?: 'equal' | 'custom' | 'percentage' | 'shares';
    members?: Array<{
        name: string;
        amount?: number;
        percentage?: number;
        shares?: number
    }>;
    isSplitValid?: boolean; // To indicate if the current split configuration is valid
}

// Props for the component itself (not directly passed by wizard but for its own structure if needed)
interface GroupSplitConfigStepProps {
    // Title and description for this step will typically come from the graph node definition
}

const ROUNDING_PRECISION = 2;

// Explicitly define the non-optional type for internal state
type DefiniteSplitType = 'equal' | 'custom' | 'percentage' | 'shares';

export function GroupSplitConfigStep(props: GroupSplitConfigStepProps) {
    const wizard = useWizard(); // Removed generic, relies on Provider context type
    const totalExpenseAmount = wizard.data.amount || 0;

    // Ensure internalSplitType state is always one of the definite types
    const [internalSplitType, setInternalSplitType] = React.useState<DefiniteSplitType>(wizard.data.splitType);
    const initialMembers = wizard.data.members || [];

    const [members, setMembers] = React.useState<NonNullable<GroupSplitConfigData['members']>>(initialMembers);
    const [inputName, setInputName] = React.useState<string>('');
    const [inputDetail, setInputDetail] = React.useState<string>('');
    const [splitValidationError, setSplitValidationError] = React.useState<string | null>(null);

    // Effect to reset/update members when splitType changes
    useEffect(() => {
        setMembers(currentMembers =>
            currentMembers.map(member => ({
                name: member.name, // Keep the name
            }))
        );
        setInputDetail('');
    }, [internalSplitType]);

    const validateSplits = useCallback(() => {
        // internalSplitType is guaranteed to be DefiniteSplitType by useState
        if (!members || members.length === 0) {
            // If splitType is not 'equal', it's an error not to have members.
            // For 'equal', it's fine not to have members initially, error appears if total amount > 0.
            if (internalSplitType !== 'equal' && totalExpenseAmount > 0) {
                return "Please add at least one member for the group expense.";
            }
            if (internalSplitType === 'equal' && totalExpenseAmount > 0 && members.length === 0) {
                return "Please add members to split the expense equally.";
            }
            return null;
        }

        switch (internalSplitType) {
            case 'custom':
                const sumOfAmounts = members.reduce((sum, m) => sum + (m.amount || 0), 0);
                if (Math.abs(sumOfAmounts - totalExpenseAmount) > 1 / (10 ** (ROUNDING_PRECISION + 1))) {
                    return `Sum of custom amounts ($${sumOfAmounts.toFixed(ROUNDING_PRECISION)}) must equal total expense ($${totalExpenseAmount.toFixed(ROUNDING_PRECISION)}). Difference: $${(totalExpenseAmount - sumOfAmounts).toFixed(ROUNDING_PRECISION)}`;
                }
                break;
            case 'percentage':
                const sumOfPercentages = members.reduce((sum, m) => sum + (m.percentage || 0), 0);
                if (Math.abs(sumOfPercentages - 100) > 1 / (10 ** ROUNDING_PRECISION)) {
                    return `Sum of percentages (${sumOfPercentages.toFixed(ROUNDING_PRECISION)}%) must be 100%.`;
                }
                break;
            case 'shares':
                if (members.some(m => (m.shares || 0) <= 0)) {
                    return "Shares must be positive numbers.";
                }
                break;
            // 'equal' case handled by the initial members check if totalExpenseAmount > 0
        }
        return null;
    }, [members, internalSplitType, totalExpenseAmount]);

    useEffect(() => {
        const validationError = validateSplits();
        setSplitValidationError(validationError);

        // A split is valid if there are no errors AND (there are members OR it's an 'equal' split where members aren't strictly needed until submission with an amount)
        const isSplitConsideredPopulated = members.length > 0 || (internalSplitType === 'equal' && totalExpenseAmount === 0) || (internalSplitType === 'equal' && members.length > 0 && totalExpenseAmount > 0);
        const isActuallyValid = validationError === null && isSplitConsideredPopulated;

        if (wizard.data.splitType !== internalSplitType ||
            wizard.data.members !== members ||
            wizard.data.isSplitValid !== isActuallyValid) { // Use isActuallyValid here
            wizard.update({ splitType: internalSplitType, members, isSplitValid: isActuallyValid });
        }
    }, [internalSplitType, members, wizard.data.splitType, wizard.data.members, wizard.data.isSplitValid, wizard.update, validateSplits, totalExpenseAmount]);

    const handleAddMember = () => {
        // internalSplitType is guaranteed to be DefiniteSplitType
        if (!inputName.trim()) {
            setSplitValidationError("Member name cannot be empty.");
            return;
        }
        if (internalSplitType !== 'equal' && !inputDetail.trim()) {
            setSplitValidationError(`Please provide ${internalSplitType === 'custom' ? 'amount' : internalSplitType === 'percentage' ? 'percentage' : 'shares'}.`);
            return;
        }

        const newMemberBase: { name: string } = { name: inputName.trim() };
        let newMemberTyped: NonNullable<GroupSplitConfigData['members']>[0] = { ...newMemberBase };

        const detailValue = parseFloat(inputDetail);
        const detailIntValue = parseInt(inputDetail, 10);

        switch (internalSplitType) {
            case 'custom':
                if (!isNaN(detailValue) && detailValue >= 0) newMemberTyped.amount = detailValue;
                else { setSplitValidationError("Invalid amount for custom split. Must be a number >= 0."); return; }
                break;
            case 'percentage':
                if (!isNaN(detailValue) && detailValue > 0 && detailValue <= 100) newMemberTyped.percentage = detailValue;
                else { setSplitValidationError("Invalid percentage. Must be > 0 and <= 100."); return; }
                break;
            case 'shares':
                if (!isNaN(detailIntValue) && detailIntValue > 0) newMemberTyped.shares = detailIntValue;
                else { setSplitValidationError("Invalid shares count. Must be an integer > 0."); return; }
                break;
        }

        setMembers(prevMembers => [...prevMembers, newMemberTyped]);
        setInputName('');
        setInputDetail('');
        setSplitValidationError(null);
    };

    const handleRemoveMember = (index: number) => {
        setMembers(prevMembers => prevMembers.filter((_, i) => i !== index));
    };

    const calculatedEqualAmount = useMemo(() => {
        if (internalSplitType === 'equal' && members.length > 0 && totalExpenseAmount > 0) {
            return (totalExpenseAmount / members.length).toFixed(ROUNDING_PRECISION);
        }
        return null;
    }, [internalSplitType, members, totalExpenseAmount]);

    const getDetailLabel = () => {
        if (internalSplitType === 'custom') return "Amount";
        if (internalSplitType === 'percentage') return "Percentage (%)";
        if (internalSplitType === 'shares') return "Shares";
        return "";
    };

    const renderMemberInputDetail = () => {
        if (internalSplitType === 'equal') return null;

        let placeholder = getDetailLabel();
        let type = "number";
        let min = "0";
        let max: string | undefined = undefined;
        let step = "any";

        if (internalSplitType === 'percentage') { max = "100"; min = "0.01"; }
        if (internalSplitType === 'shares') { min = "1"; step = "1"; }

        return (
            <input
                type={type}
                value={inputDetail}
                onChange={e => setInputDetail(e.target.value)}
                className={`input input-bordered w-full ${splitValidationError && (internalSplitType !== 'custom' && !inputDetail.trim()) ? 'input-error' : ''}`}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                required
            />
        );
    };

    return (
        <div className="space-y-6 p-4 bg-[hsl(var(--input))] rounded-md shadow">
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-medium">Split Type</span>
                </label>
                <select
                    value={internalSplitType}
                    onChange={e => setInternalSplitType(e.target.value as DefiniteSplitType)}
                    className="select select-bordered w-full"
                >
                    <option value="equal">Equal</option>
                    <option value="custom">By Amount</option>
                    <option value="percentage">By Percentage</option>
                    <option value="shares">By Shares</option>
                </select>
            </div>

            <div className="form-control space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text font-medium">Add Members</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-x-2 gap-y-2 items-end">
                        <div>
                            <label htmlFor="memberName" className="text-xs text-[hsl(var(--muted-foreground))]">Member name or email</label>
                            <input
                                id="memberName"
                                type="text"
                                value={inputName}
                                onChange={e => setInputName(e.target.value)}
                                className={`input input-bordered w-full ${splitValidationError && !inputName.trim() ? 'input-error' : ''}`}
                                placeholder="Enter name/email"
                            />
                        </div>
                        {internalSplitType !== 'equal' && (
                            <div className="w-full">
                                <label htmlFor="memberDetail" className="text-xs text-[hsl(var(--muted-foreground))]">{getDetailLabel()}</label>
                                {renderMemberInputDetail()}
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleAddMember}
                            disabled={!inputName.trim() || (internalSplitType !== 'equal' && !inputDetail.trim())}
                            className={`btn btn-primary w-full ${internalSplitType === 'equal' ? 'md:col-start-3' : ''}`}>
                            Add Member
                        </button>
                    </div>
                </div>

                {splitValidationError && (
                    <p className="text-error text-sm p-2 bg-error/10 rounded-md">{splitValidationError}</p>
                )}

                {members.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Members Added: ({members.length})</h4>
                        <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                            {members.map((member, idx: number) => (
                                <li key={idx} className="flex items-center justify-between p-3 bg-[hsl(var(--background))] rounded-lg shadow-sm hover:bg-[hsl(var(--muted))]">
                                    <span className="truncate text-sm" title={member.name}>
                                        {member.name}
                                        {internalSplitType === 'custom' && member.amount !== undefined && ` - $${member.amount.toFixed(ROUNDING_PRECISION)}`}
                                        {internalSplitType === 'percentage' && member.percentage !== undefined && ` - ${member.percentage}%`}
                                        {internalSplitType === 'shares' && member.shares !== undefined && ` - ${member.shares} shares`}
                                        {internalSplitType === 'equal' && calculatedEqualAmount && ` - $${calculatedEqualAmount}`}
                                    </span>
                                    <button
                                        onClick={() => handleRemoveMember(idx)}
                                        className="btn btn-xs btn-error btn-outline ml-2 shrink-0"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
} 
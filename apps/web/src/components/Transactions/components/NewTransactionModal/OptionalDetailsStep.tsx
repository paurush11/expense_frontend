import React from 'react';
import { FormStep } from '../../../../components/ModalWithSteps/FormStep';
import { useWizard } from '../../../../components/ModalWithSteps/StepsWizard';

export function OptionalDetailsStep() {
    const wizard = useWizard();
    const { amount, tax, tip, discount } = wizard.data;

    let validationError: string | undefined = undefined;
    const numericAmount = Number(amount) || 0;
    const numericTax = Number(tax) || 0;
    const numericTip = Number(tip) || 0;
    const numericDiscount = Number(discount) || 0; // Assuming discount reduces the sum that needs to be checked against amount

    // We are checking if the sum of tax and tip (potentially reduced by discount) exceeds the amount.
    // Or, more directly, if amount is less than tax + tip - discount.
    // A discount should ideally reduce the total cost, so it might not directly play into *this specific* validation
    // rule (amount vs. additions like tax/tip). Let's focus on tax + tip vs amount.
    // If discount is applied to the subtotal *before* tax/tip, the `amount` field should reflect that already.
    // If discount is applied to the *grand total*, it's a different calculation.

    // Assuming `amount` is the subtotal BEFORE tax and tip, and discount applies to this subtotal.
    // The common scenario: Subtotal - Discount + Tax + Tip = Final Total.
    // If `amount` in `wizard.data` is supposed to be the final total, this logic is more complex.
    // For now, let's assume `amount` is the item total, and tax/tip are added.
    // The more direct validation: Sum of parts (items + tax + tip) should not exceed a known grand total if available.
    // Or, if `amount` is the pre-tax/tip subtotal, then `amount` should be greater than or equal to `discount`.
    // And a separate check for `amount - discount + tax + tip` = `grandTotal` if that field exists.

    // Let's simplify: if `amount` is intended to be the overall expense total, then
    // `tax + tip` should not logically exceed `amount` if `amount` is the final sum.
    // If `amount` is a subtotal, and we are adding tax and tip:
    const additions = numericTax + numericTip;
    if (numericAmount > 0 && additions > numericAmount) {
        validationError = `The sum of Tax (${numericTax.toFixed(2)}) and Tip (${numericTip.toFixed(2)}) is ${additions.toFixed(2)}, which exceeds the Amount (${numericAmount.toFixed(2)}).`;
    }
    // This validation doesn't account for discount correctly yet without clarifying what 'amount' represents.
    // If 'amount' is the final total, then: tax + tip + (original item cost) - discount = amount
    // This implies tax + tip - discount <= amount.
    // A more robust approach is usually done on a ReviewStep where all values are present.

    // For now, simple check: Tax + Tip should not exceed Amount.
    // We could also prevent going Next if this condition is met, but graph edges handle data requirements.
    // Displaying an error is a good first step.

    return (
        <FormStep
            customError={validationError}
            fields={[
                {
                    id: 'paymentMethod',
                    label: 'Payment Method',
                    type: 'select',
                    required: false,
                    choiceKey: 'paymentMethods',
                    placeholder: 'Select payment method',
                },
                {
                    id: 'location',
                    label: 'Location',
                    type: 'text',
                    required: false,
                    placeholder: 'e.g., Cafe Central',
                },
                {
                    id: 'tags',
                    label: 'Tags (comma-separated)',
                    type: 'text',
                    required: false,
                    placeholder: 'e.g., work, travel, project-x',
                },
                {
                    id: 'notes',
                    label: 'Notes',
                    type: 'textarea',
                    required: false,
                    placeholder: 'Any additional notes...',
                },
                {
                    id: 'tax',
                    label: 'Tax',
                    type: 'number',
                    required: false,
                    placeholder: '0.00',
                },
                {
                    id: 'tip',
                    label: 'Tip',
                    type: 'number',
                    required: false,
                    placeholder: '0.00',
                },
                {
                    id: 'discount',
                    label: 'Discount',
                    type: 'number',
                    required: false,
                    placeholder: '0.00',
                },
            ]}
        />
    );
} 
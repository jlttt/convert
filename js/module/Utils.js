/**
 * Ensure that the input is a valid number or return 0.
 */
export function sanitize(input) {
    let floatInput = parseFloat(input);
    if (isNaN(floatInput)) {
        return 0;
    }
    return floatInput;
}

/**
 * Format amount in monetary format
 */
export function format(output) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: output.currency() }).format(output.value());
}
export function Amount(value, currency) {
    this.value = function() { return value; }
    this.currency = function() { return currency; }
}
import { Amount } from './Amount.js';

export function Converter(exchangeRates) {

    this.fromTo = function(amount, currency) {
        let exchangeRate = exchangeRates.formEurTo(currency);
        return new Amount(
            Math.round(amount.value() * exchangeRate * 100) / 100,
            currency
        );
    }
}

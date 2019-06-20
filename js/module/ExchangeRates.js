export function ExchangeRates(rates)
{
    this.formEurTo = function(currency) {
        return rates[currency];
    }
}
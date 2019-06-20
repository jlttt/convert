import { Amount } from './Amount.js';
import { Converter } from './Converter.js';
import { ExchangeRates } from './ExchangeRates.js';
import { Provider } from './Provider.js';
import { sanitize, format } from './Utils.js';

(function() {
    let euroInput = document.getElementById('euro-input');
    let currencySelector = document.getElementById('currency-selector');
    let conversionDisplayer = document.getElementById('conversion-displayer');
    let convert;

    /**
     * Convert entered amount in Euros to selected currency and display it.
     * This function will be triggered on amount or currency change.
     */
    function startConversion() {
        let amount = new Amount(sanitize(euroInput.value), 'EUR');
        let currency = currencySelector.value;

        let converted = convert.fromTo(amount, currency);

        conversionDisplayer.innerHTML = format(converted);
    }

    /**
     * Populate the HTML select element with options related to the currencies
     */
    function populateCurrencySelector(currencySelector, currencies) {
        Object.keys(currencies).map(function(currencyCode) {
            let option = document.createElement('option');
            option.setAttribute('value', currencyCode);
            option.innerText = currencyCode + ' - ' + currencies[currencyCode];
            currencySelector.appendChild(option);
        });
        $(currencySelector).selectpicker({liveSearch:true});
    }

    let provider = new Provider({
        //// Uncomment the following two lines to user fixer.io api
        //apiKey: YOUR_API_KEY,
        //mode: 'dynamic',
        onCurrenciesLoaded: function(currencies) {
            populateCurrencySelector(currencySelector, currencies)
        },
        onExchangeRatesLoaded: function(rates) {
            // exchangeRate are loaded,
            // converter is instantiate
            convert = new Converter(
                new ExchangeRates(rates)
            );
        },
        onAllDataLoaded: function() {
            // all data are loaded (currencies and exchange rates),
            // conversions are now triggered on amount or currency changes.
            euroInput.oninput = startConversion;
            currencySelector.onchange = startConversion;
            startConversion();
        }
    }).launch();
})();
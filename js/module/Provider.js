export function Provider(customOptions)
{
    let isCurrenciesLoaded = false;
    let isExchangeRatesLoaded = false;

    let options = Object.assign(
        {
            apiKey: null,
            mode: 'static',
            onAllDataLoaded : function() {},
            onCurrenciesLoaded : function() {},
            onExchangeRatesLoaded : function() {},
        },
        customOptions
    );

    /**
     * Start the loadings
     */
    this.launch = function() {
        loadCurrencies();
        loadExchangeRates();
    };

    /**
     * Manage the request of the exchange rates
     */
    function loadExchangeRates() {
        let url = resolveUrl() + '/latest' + '?acces_key=' + options.apiKey;

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                options.onExchangeRatesLoaded(response.rates);
                isExchangeRatesLoaded = true;
                triggerIfNeededAllDataLoaded();
            });
    }

    /**
     * Manage the request of the currencies
     */
    function loadCurrencies() {
        let url = resolveUrl() + '/symbols' + '?acces_key=' + options.apiKey;

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                options.onCurrenciesLoaded(response.symbols);
                isCurrenciesLoaded = true;
                triggerIfNeededAllDataLoaded();
            });
    }

    /**
     * Determine the API entry point according to the options provided
     */
    function resolveUrl() {
        if (options.mode === 'dynamic') {
            return 'http://data.fixer.io/api';
        }
        return 'static';
    }

    /**
     * Control if all data ara loaded and trigger the associated callback
     */
    function triggerIfNeededAllDataLoaded() {
        if (isCurrenciesLoaded && isExchangeRatesLoaded) {
            options.onAllDataLoaded();
        }
    }
}

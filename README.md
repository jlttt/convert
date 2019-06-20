# Convert

From Euros to (almost) anything.

## Getting Started

After cloning or downloading the repo, you just have to open `index.html` in a browser to launch the app.

### Prerequisites

A modern browser supporting:
- ES6 module,
- `fetch`,
- `Object.assign()`.

For some browser (for example Chromium), you will need to serve the app through a http server due to CORS policy.

### Configuration

By default currencies and exchange rates are collected from static local files.

To use [fixer.io](https://fixer.io/) API, just add the following options when instantiating the `Provider`:
```javascript
// js/main.js

let provider = new Provider({
    // ...
    apiKey: YOUR_FIXER.IO_API_KEY,
    mode: 'dynamic',
}
```

### External dependencies

- [Bootsrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [bootsrap-select](https://developer.snapappointments.com/bootstrap-select/)

## License

This project is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying LICENSE file.
# filter-zip-codes

[![Current npm package version](https://img.shields.io/npm/v/filter-zip-codes.svg)](https://www.npmjs.com/package/filter-zip-codes) [![Build Status](https://travis-ci.com/AustinLeeGordon/filter-zip-codes.svg?branch=master)](https://travis-ci.com/AustinLeeGordon/filter-zip-codes)

Keep or remove zip/postal codes from CSV and JSON data.

## Usage

```js
// From CSV
await filterZipCodes(
    // Array of zip codes
    [12345, 67890],
    // Options
    {
        // Keep the zip codes provided (true) or remove them (false)
        // Default: false
        keep: false,
    }
).fromCsv(csvString, headerString);

// From JSON
filterZipCodes(
    [12345, 67890]
).fromJson(jsonString, keyString);
```

## License

MIT © [Austin Gordon](https://www.austinleegordon.com)
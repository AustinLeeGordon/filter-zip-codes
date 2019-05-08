# filter-zip-codes

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
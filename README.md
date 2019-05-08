# filter-zip-codes

Remove unwanted zip/postal codes from CSV and JSON data.

## Usage

```js
// From CSV
await filterZipCodes(
    [12345, 67890] // Array of zip codes
).fromCsv(csvString, headerString);

// From JSON
filterZipCodes(
    [12345, 67890] // Array of zip codes
).fromJson(jsonString, keyString);
```

## License

MIT © [Austin Gordon](https://www.austinleegordon.com)
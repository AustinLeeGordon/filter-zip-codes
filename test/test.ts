import { filterZipCodes } from "../src";
const fs = require('fs');
const path = require('path');

const csvData = fs.readFileSync(path.join(__dirname, 'data/csv-data.csv'), 'utf-8');
const tsvData = fs.readFileSync(path.join(__dirname, 'data/tsv-data.txt'), 'utf-8');
const jsonData = fs.readFileSync(path.join(__dirname, 'data/json-data.json'), 'utf-8');
const plusFourData = fs.readFileSync(path.join(__dirname, 'data/plus-four.json'), 'utf-8');

describe("filterZipCodes", () => {
    test("should filter from csv", async () => {
        const zips = [
            60681,
            94263,
        ];
        const filtered = await filterZipCodes(zips).fromCsv(csvData, 'zip_code');
        zips.forEach(zip => {
            let match = filtered.indexOf(String(zip));
            expect(match).toEqual(-1);
        })
    });
    test("should filter from tsv", async () => {
        const zips = [
            60681,
            94263,
        ];
        const filtered = await filterZipCodes(zips).fromCsv(tsvData, 'zip_code');
        zips.forEach(zip => {
            let match = filtered.indexOf(String(zip));
            expect(match).toEqual(-1);
        })
    });
    test("should filter from json", () => {
        const zips = [
            60681,
            94263,
        ];
        const filtered = filterZipCodes(zips).fromJson(jsonData, 'zip_code');
        zips.forEach(zip => {
            let match = filtered.indexOf(String(zip));
            expect(match).toEqual(-1);
        })
    });
    test("should accept zips as string", () => {
        const zips = [
            '60681',
            '94263',
        ];
        const filtered = filterZipCodes(zips).fromJson(jsonData, 'zip_code');
        zips.forEach(zip => {
            let match = filtered.indexOf(zip);
            expect(match).toEqual(-1);
        })
    });
    test("should remove zips with +4 code", () => {
        const zips = [
            '60681',
            '49018',
        ];
        const filtered = filterZipCodes(zips).fromJson(plusFourData, 'zip_code');
        console.log(filtered);
        zips.forEach(zip => {
            let match = filtered.indexOf(zip);
            expect(match).toEqual(-1);
        })
    });
});
import { csvToJson, jsonToCsv } from './utils';

export function filterZipCodes(zips: Array<number | string>) {
    zips = zips.map(zip => String(zip));

    function filter(zip: string | number): boolean {
        zip = String(zip);
        // Remove 4-digit extensions
        zip = zip.split('-')[0];
        if (zips.indexOf(zip) >= 0) {
            return false;
        }
        return true;
    }

    return {
        fromCsv: function (csvStr: string, colHeading: string): Promise<string> {
            return new Promise(async (resolve, reject) => {
                const data = await csvToJson(csvStr);
                const { json, header } = data;
                const filtered = json.filter(obj => filter(obj[colHeading]));
                const output = jsonToCsv(JSON.stringify(filtered), header);
                resolve(output);
            });
        },
        fromJson: function (jsonStr: string, key: string): string {
            const data = JSON.parse(jsonStr);
            const filtered = data.filter(obj => filter(obj[key]));
            const output = JSON.stringify(filtered)
            return output;
        }
    }
}

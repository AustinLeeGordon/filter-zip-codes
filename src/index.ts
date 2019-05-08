import * as P from 'bluebird';
import { csvToJson, jsonToCsv } from './utils';

export interface filterZipCodesOptions {
    keep?: boolean
}

export function filterZipCodes(zips: Array<number | string>, options?: filterZipCodesOptions) {
    zips = zips.map(zip => String(zip));

    options = Object.assign({
        keep: false,
    }, options);

    function filter(zip: string | number): boolean {
        zip = String(zip);
        // Remove 4-digit extensions
        zip = zip.split('-')[0];
        let matchIndex = zips.indexOf(zip);
        if (options.keep) {
            if (matchIndex >= 0) {
                return true;
            }
            return false;
        } else {
            if (matchIndex >= 0) {
                return false;
            }
            return true;
        }
    }

    return {
        fromCsv: function (csvStr: string, colHeading: string): PromiseLike<string> {
            return new P(async (resolve, reject) => {
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

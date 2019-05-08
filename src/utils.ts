import * as csv from "csvtojson";
import * as P from "bluebird";
import { Parser } from "json2csv";

export function csvToJson(str: string, opts: object = { delimiter: [',', '\t'] }): PromiseLike<{ json: { [key: string]: any }, header: string[] }> {
    return new P((resolve, reject) => {
        let header;
        csv(opts)
            .fromString(str)
            .on('header', res => {
                header = res;
            })
            .then(json => {
                resolve({
                    json,
                    header
                });
            });
    });
}

export function jsonToCsv(json: string, fields: Array<string>): string {
    const json2csvParser = new Parser({ fields });
    return json2csvParser.parse(json);
}
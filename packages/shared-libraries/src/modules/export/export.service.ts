import { Injectable } from '@nestjs/common';
import xl from 'excel4node';
import * as csvSync from 'csv-stringify/sync';

@Injectable()
export class ExportService {
  async createStringifyCsv(data: any[]): Promise<Buffer> {
    // Replace null strings with null, so the cells will have empty value
    data.forEach((row) => {
      Object.keys(row).forEach((key) => {
        row[key] = row[key] === 'null' ? null : row[key];
      });
    });

    const dataWithHeader: any[] = this.addHeader(data);

    const output = Buffer.from(csvSync.stringify(dataWithHeader), 'utf-8');
    return output;
  }

  // eslint-disable-next-line class-methods-use-this
  async createJsonBuffer(data: any[]): Promise<Buffer> {
    const newData = JSON.stringify(data);
    return Buffer.from(newData);
  }

  async createXlsx(data: any[]): Promise<Buffer> {
    const workbook = new xl.Workbook();
    const worksheet = workbook.addWorksheet('Main');

    const dataWithHeader: any[] = this.addHeader(data);

    dataWithHeader.forEach((item, i) => {
      let index = 1;
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in item) {
        worksheet
          .cell(i + 1, index)
          .string(['null', null, undefined, ''].includes(item[key]) ? '' : JSON.stringify(item[key]));
        index++;
      }
    });
    let res: Buffer;
    await workbook.writeToBuffer().then(function (buffer) {
      res = buffer;
    });
    return res;
  }

  // eslint-disable-next-line class-methods-use-this
  async createPdf(data: any[]): Promise<Buffer> {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const PDFDocument = require('pdfkit-table');

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const doc = new PDFDocument({ margin: 5, size: 'A4' });
      doc.font('Helvetica').fontSize(8);

      const headers = Object.keys(data[0]);
      const datas = data.map((merchantUser) => {
        const values = Object.values(merchantUser);

        // convert null to string "null"
        // eslint-disable-next-line no-restricted-syntax
        for (const [i, key] of values.entries()) {
          if (key == null) {
            values[i] = '';
          }
        }

        return values;
      });

      const table = {
        title: `Exported on ${new Date().toLocaleString()}`,
        headers,
        rows: datas,
      };

      await doc.table(table, {});
      doc.end();

      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addHeader(data: any[]): any {
    // this function add first row keys as headers
    const keys = Object.keys(data[0]);
    const header = Object.assign(
      {},
      ...keys.map((value) => ({
        [value]: value,
      })),
    );
    data.unshift(header);
    return data;
  }
}

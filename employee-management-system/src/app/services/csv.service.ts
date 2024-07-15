import { EventEmitter, Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}
  exportEvent: EventEmitter<any[]> = new EventEmitter();
  downloadCSV(data: any[], filename: string) {
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, filename);
  }
  private convertToCSV(data: any[]): string {
    let csvContent = '';
    const headers = Object.keys(data[0]);
    csvContent+=(headers.join(','));
    csvContent+='\r\n';
    data.forEach((row, index) => {
      const values = Object.values(row).join(',');
      csvContent += index > 0 ? '\r\n' : '';
      csvContent += values;
    });

    return csvContent;
  }
}

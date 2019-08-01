/* eslint-disable @typescript-eslint/no-object-literal-type-assertion, @typescript-eslint/no-explicit-any */
import XLSX, {WorkSheet} from 'xlsx';
import {saveAs} from 'file-saver';

// String转换为ArrayBuffer
function s2ab(s: any): ArrayBuffer {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

/* 导出 excel: 单个 sheet */
export function convertExcel(
  data: (number | string)[][],
  fileName: string
): void {
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws['!cols'] = data[0].map((v) => ({width: 10}));
  // const ws = XLSX.utils.json_to_sheet(data); // convert array of objects to sheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

/**
 * multiple sheet excel file .xlsx
 */
interface SheetItemProps {
  name: string;
  data: (number | string)[][];
}
interface WorkbookOptions {
  SheetNames: string[];
  Sheets: {
    [key: string]: WorkSheet;
  };
}
export default function convertArrayToExcel(
  list: SheetItemProps[],
  fileName: string
): void {
  const wb = {SheetNames: [], Sheets: {}} as WorkbookOptions;
  // const wb = {SheetNames: [], Sheets: {}} as WorkbookOptions;
  const result = list.reduce((prev, cur) => {
    const {name, data} = cur;
    prev.SheetNames.push(name);
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = data[0].map((v) => ({width: 14}));
    prev.Sheets[name] = ws;
    return prev;
  }, wb);

  const blob = new Blob(
    [s2ab(XLSX.write(result, {bookType: 'xlsx', type: 'binary'}))],
    {
      type: 'application/octet-stream',
    }
  );

  saveAs(blob, `${fileName}.xlsx`);
}

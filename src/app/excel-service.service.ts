import {Injectable} from '@angular/core';
import * as ExcelJS from 'exceljs';
import {saveAs} from 'file-saver';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ExcelService {
    constructor() {
    }

    exportToExcel(): void {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sample Sheet');

        worksheet.columns = [
            {header: 'FECHA INICIO (DD/MM/YYYY)*', key: 'id', width: 30},
            {header: 'FECHA FIN (DD/MM/YYYY) *', key: 'name', width: 30},
            {header: 'FECHA PERIODO (DD/MM/YYYY)*', key: 'dob', width: 30},
        ];

        worksheet.addRow({id: 1, name: 'John Doe', dob: new Date('10/01/2024')});
        worksheet.addRow({id: 2, name: 'Jane Smith', dob: new Date('10/01/2024')});

        worksheet.getCell('A1').font = {
            name: 'Arial',
            size: 14,
            bold: true,
            color: {argb: 'FFFF0000'} // Красный текст
        };
        worksheet.getCell('A1').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'FF00FF00'} // Зелёный фон
        };
        worksheet.getCell('A1').border = {
            top: {style: 'thin', color: {argb: 'FF000000'}},
            left: {style: 'thin', color: {argb: 'FF000000'}},
            bottom: {style: 'thin', color: {argb: 'FF000000'}},
            right: {style: 'thin', color: {argb: 'FF000000'}}
        };
        worksheet.getCell('A1').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };


        worksheet.getCell('B1').font = {
            name: 'Arial',
            size: 14,
            bold: true,
            color: {argb: 'FFFF0000'} // Красный текст
        };
        worksheet.getCell('B1').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'FF00FF00'} // Зелёный фон
        };
        worksheet.getCell('B1').border = {
            top: {style: 'thin', color: {argb: 'FF000000'}},
            left: {style: 'thin', color: {argb: 'FF000000'}},
            bottom: {style: 'thin', color: {argb: 'FF000000'}},
            right: {style: 'thin', color: {argb: 'FF000000'}}
        };
        worksheet.getCell('B1').alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };

        // Сохранение файла
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, 'Sample.xlsx');
        });
    }


    readExcelFile(file: File): Observable<any[]> {
        return new Observable((observer) => {
            const reader = new FileReader();

            reader.onload = async (event: any) => {
                try {
                    const data = new Uint8Array(event.target.result);
                    const workbook = new ExcelJS.Workbook();
                    await workbook.xlsx.load(data);

                    const worksheet = workbook.worksheets[0]; // Первый лист
                    const jsonData: any[] = [];

                    const headerRow = worksheet.getRow(1); // Первая строка
                    const headers: string[] = (headerRow?.values as any[])
                        ?.filter((value) => typeof value === 'string') || []; // Оставляем только строки


                    worksheet.eachRow((row, rowNumber) => {
                        if (rowNumber === 1) return; // Пропускаем заголовок

                        const rowData: any = {};
                        row.eachCell((cell, colNumber) => {
                            const header = headers[colNumber - 1]; // Получаем заголовок колонки
                            if (header) {
                                rowData[header] = cell.value; // Записываем значение
                            }
                        });

                        jsonData.push(rowData);
                    });

                    observer.next(jsonData); // Отправляем данные в подписку
                    observer.complete(); // Завершаем поток
                } catch (error) {
                    observer.error(error); // Обрабатываем ошибки
                }
            };

            reader.onerror = (error) => observer.error(error);
            reader.readAsArrayBuffer(file);
        });
    }
}

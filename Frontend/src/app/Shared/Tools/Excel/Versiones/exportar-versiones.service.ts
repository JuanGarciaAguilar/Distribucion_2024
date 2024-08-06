import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
    providedIn: 'root',
})
export class ExportarVersionesService {
    constructor() {}

    private _workbook!: Workbook;

    async ExportarVersiones(data: any, title: string): Promise<void> {
        this._workbook = new Workbook();
        this._workbook.creator = 'Altas';
        await this._CreationFile(data, title);
        this._workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data]);
            FileSaver.saveAs(blob, 'reporte historial de versiones.xlsx');
        });
    }

    async _CreationFile(data: any, title: string): Promise<void> {
        // creamos una hoha
        let hoja = this._workbook.addWorksheet('Historial de versiones', {
            properties: { tabColor: { argb: 'FF00FF00' } },
            views: [
                { showGridLines: false },
                /*  {state: 'frozen', ySplit: 9, activeCell: 'A1', showGridLines:false} */
            ],
        });
        //   let hoja = this._workbook.addWorksheet('data');

        //asignamos columnas
        hoja.getColumn('A').width = 5;
        hoja.getColumn('B').width = 20;
        hoja.getColumn('B').alignment = { horizontal: 'center' };
        hoja.getColumn('C').width = 20;
        hoja.getColumn('D').width = 20;
        hoja.getColumn('E').width = 20;

        hoja.columns.forEach((column: any) => {
            /// Vertical ajustar texto
            /// wraptext supera el tamaño de la columna pasa a la siguiente
            column.alignment = {
                vertical: 'middle',
                wrapText: true,
                horizontal: 'center',
            };
        });


        hoja.getRow(1).values = ['', title];
        hoja.getCell('B1').font = {
            size:16,
            bold: true,
        }
        /* hoja.getCell('B1').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FCAF73' },
        }; */
        hoja.mergeCells('B:1', 'E:1');

        const HeaderGrilla = hoja.getRow(2);

        HeaderGrilla.values = [
            '',
            'FECHA PRODUCCIÓN',
            'DESCRIPCION',
            'VERSION',
            'USUARIO',
        ];

        HeaderGrilla.font = {
            name: 'Calibri',
            family: 4,
            size: 12,
            //underline: true,
            bold: true,
            color: { argb: '#0000ff' },
        };

        HeaderGrilla.getCell(2).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FCAF73' },
        };
        HeaderGrilla.getCell(3).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FCAF73' },
        };
        HeaderGrilla.getCell(4).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FCAF73' },
        };
        HeaderGrilla.getCell(5).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FCAF73' },
        };

        HeaderGrilla.getCell(2).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        HeaderGrilla.getCell(3).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        HeaderGrilla.getCell(4).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        HeaderGrilla.getCell(5).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };



        data.forEach((d: any, index: any) => {
            let Celda = hoja.addRow([
                '',
                d.DateProduction,
                d.Description,
                d.Version,
                d.UserCreate,
            ]);

            Celda.getCell(2).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
            Celda.getCell(3).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
            Celda.getCell(4).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
            Celda.getCell(5).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };

            Celda.getCell(2).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
            };
            Celda.getCell(3).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
            };
            Celda.getCell(4).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
            };
            Celda.getCell(5).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
            };
        });
    }
}

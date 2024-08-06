import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { ImagePosition, Workbook } from 'exceljs';
import { EventEmitter } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class MovimientoPerfilesService {
    constructor() {}

    private _workbook!: Workbook;

    async DescargaFile(data: any): Promise<void> {
        this._workbook = new Workbook();
        this._workbook.creator = 'Moviento de perfiles';
        await this._CreationFile(data);
        this._workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data]);
            FileSaver.saveAs(blob, 'reporte de movimiento de perfiles.xlsx');
        });
    }

    async _CreationFile(data: any): Promise<void> {
        // creamos una hoha
        let hoja = this._workbook.addWorksheet('Movimientos', {
            properties: { tabColor: { argb: 'FF00FF00' } },
            views: [
                { showGridLines: false },
                /*  {state: 'frozen', ySplit: 9, activeCell: 'A1', showGridLines:false} */
            ],
        });
        //   let hoja = this._workbook.addWorksheet('data');

        //asignamos columnas
        hoja.getColumn('A').width = 10;
        hoja.getColumn('B').width = 5;
        hoja.getColumn('B').alignment = { horizontal: 'center' };
        hoja.getColumn('C').width = 60;
        hoja.getColumn('C').alignment = { horizontal: 'center' };
        hoja.getColumn('D').width = 25;
        hoja.getColumn('E').width = 20;
        hoja.getColumn('F').width = 20;

        hoja.columns.forEach((column: any) => {
            /// Vertical ajustar texto
            /// wraptext supera el tamaño de la columna pasa a la siguiente
            column.alignment = {
                vertical: 'middle',
                wrapText: true,
                horizontal: 'center',
            };
        });

        const HeaderGrilla = hoja.getRow(2);
        HeaderGrilla.values = [
            '',
            '#',
            'Alta',
            'Observación',
            'Fecha',
            'Usuario registro',
        ];
        HeaderGrilla.font = {
            name: 'Calibri',
            family: 4,
            size: 14,
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
        HeaderGrilla.getCell(6).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FCAF73' },
        };
        HeaderGrilla.getCell(2).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
         //   right: { style: 'thin' },
        };
        HeaderGrilla.getCell(3).border = {
            top: { style: 'thin' },
          //  left: { style: 'thin' },
            bottom: { style: 'thin' },
          //  right: { style: 'thin' },
        };
        HeaderGrilla.getCell(4).border = {
            top: { style: 'thin' },
         //   left: { style: 'thin' },
            bottom: { style: 'thin' },
         //   right: { style: 'thin' },
        };
        HeaderGrilla.getCell(5).border = {
            top: { style: 'thin' },
        //    left: { style: 'thin' },
            bottom: { style: 'thin' },
        //    right: { style: 'thin' },
        };
        HeaderGrilla.getCell(6).border = {
            top: { style: 'thin' },
        //    left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        data.forEach((d: any, index: any) => {


           /* let Celdaa = hoja.addRow([

            ]);
           */
            d.child.forEach((a:any, index2:any)=>{

                let Celda = hoja.addRow([
                    '',
                    a.row,
                    index2 == 0 ? d.cPersNombre : '',
                    a.Observaciones,
                    a.FechaCreate,
                    a.UsuarioCreate,
                ]);

            Celda.getCell(2).border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
              //   right: { style: 'thin' },
            };
            Celda.getCell(3).border = {
                top: { style: 'thin' },
             //    left: { style: 'thin' },
                bottom: { style: 'thin' },
              //   right: { style: 'thin' },
            };
            Celda.getCell(4).border = {
                top: { style: 'thin' },
              //   left: { style: 'thin' },
                bottom: { style: 'thin' },
              //   right: { style: 'thin' },
            };
            Celda.getCell(5).border = {
                top: { style: 'thin' },
              //   left: { style: 'thin' },
                bottom: { style: 'thin' },
              //   right: { style: 'thin' },
            };
            Celda.getCell(6).border = {
                top: { style: 'thin' },
              //   left: { style: 'thin' },
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
            Celda.getCell(6).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
            };
            });



        });

        let array = this.MergaDinamico(data);
   
        array.forEach((item: any) => {

          hoja.mergeCells('C' + item.X1 + ':C' + item.X2);
         // hoja.mergeCells('C' + item.X1 + ':H' + item.X2);
        });

    }

    MergaDinamico(data: any) {
        let datamerge: any[] = [];
        let arr: any[] = [];
        var X1 = 3;
        data.forEach((item: any) => {
          if (datamerge.length <= 0) {
            let obj = {
              X1: 3,
              X2: 3 + item.child.length - 1,
            };
            datamerge.push(obj);
            X1 = 3 + item.child.length;
          } else {
            let obj = {
              X1: X1,
              X2: X1 + item.child.length - 1,
            };
            datamerge.push(obj);
            X1 = X1 + item.child.length;
          }
        });

        return datamerge;
      }
}

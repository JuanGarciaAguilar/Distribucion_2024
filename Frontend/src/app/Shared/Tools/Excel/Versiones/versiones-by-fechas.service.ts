import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class VersionesByFechasService {
    constructor() {}

    private _workbook!: Workbook;

    async ExportarVersiones(data: any, data1: any): Promise<void> {
        this._workbook = new Workbook();
        this._workbook.creator = 'Reportes versiones por fechas';
        await this._CreationFile(data, data1);
        this._workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data]);
            FileSaver.saveAs(
                blob,
                'reporte historial de versiones por fechas.xlsx'
            );
        });
    }

    async _CreationFile(data: any, data1: any): Promise<void> {
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
        hoja.getColumn('B').width = 40;
        hoja.getColumn('B').alignment = { horizontal: 'center' };
        hoja.getColumn('C').width = 50;
        hoja.getColumn('D').width = 20;
        hoja.getColumn('E').width = 20;
        hoja.getColumn('F').width = 100;
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
            'APLICACION',
            'DESCRIPCION',
            'FECHA DE PRODUCCION',
            'VERSION',
            'ARCHIVOS'
        ];

        HeaderGrilla.font = {
            name: 'Calibri',
            family: 4,
            size: 12,
            //underline: true,
            bold: true,
            color: { argb: 'ffffff' },
        };
        HeaderGrilla.getCell(2).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '043d75' },

        };
        HeaderGrilla.getCell(3).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '043d75' },
        };
        HeaderGrilla.getCell(4).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '043d75' },
        };
        HeaderGrilla.getCell(5).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '043d75' },
        };
        HeaderGrilla.getCell(6).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '043d75' },
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
        HeaderGrilla.getCell(6).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        data.forEach((P: any, index: any) => {

            if (P.child !== undefined) {
                P.child.forEach((H: any, index2: any) => {

                    let datatrasn='';

                   if (H.files !== undefined) {
                        H.files.forEach((f: any, index2: any) => {
                            datatrasn +=  f.nombre + '  -  '
                        });
                    }

                    let Celda = hoja.addRow([
                        '',
                        P.Aplicacion,
                        // index2 == 0 ? d.cPersNombre : '',
                        H.Description,
                        moment(H.DateProduction).format('DD/MM/YYYY'),
                        H.Version,
                        datatrasn,
                    ]);

                   /*  let Celda = hoja.addRow([
                        '',
                        P.Aplicacion,
                        // index2 == 0 ? d.cPersNombre : '',
                        H.Description,
                        moment(H.DateProduction).format('DD/MM/YYYY'),
                        H.Version,
                        datatrasn,
                    ]); */


                    Celda.getCell(2).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        //right: { style: 'thin' },
                    };
                    Celda.getCell(3).border = {
                        top: { style: 'thin' },
                       // left: { style: 'thin' },
                        bottom: { style: 'thin' },
                       // right: { style: 'thin' },
                    };
                    Celda.getCell(4).border = {
                        top: { style: 'thin' },
                        //left: { style: 'thin' },
                        bottom: { style: 'thin' },
                       // right: { style: 'thin' },
                    };
                    Celda.getCell(5).border = {
                        top: { style: 'thin' },
                        //left: { style: 'thin' },
                        bottom: { style: 'thin' },
                      //  right: { style: 'thin' },
                    };
                    Celda.getCell(6).border = {
                        top: { style: 'thin' },
                        //left: { style: 'thin' },
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
            }
        });

     /*    data1.forEach((P: any, index: any) => {
            let Celda = hoja.addRow([
                '',
                P.Aplicacion,
                // index2 == 0 ? d.cPersNombre : '',
                P.Description,
                P.DateProduction,
                P.Version,
                P.nombre,
            ]);
        }); */

        let array = this.MergeAplicaion(data);

      array.forEach((item: any) => {
            hoja.mergeCells('B' + item.X1 + ':B' + item.X2);
        });

    }
    MergeAplicaion(data: any) {debugger
        let datamerge: any[] = [];
        let arr: any[] = [];
        var X1 = 3;
        data.forEach((item: any) => {debugger
            if (datamerge.length <= 0) {
                let obj = {
                    X1: 3,
                    X2: 3 + item.child.length - 1,
                };
                datamerge.push(obj);
                X1 = 3 + item.child.length;
            } else {debugger

                if (item.child !== undefined){
                    let obj = {
                        X1: X1,
                        X2: X1 + item.child.length - 1,
                    };
                    datamerge.push(obj);
                    X1 = X1 + item.child.length;
                }

            }
        });
debugger
        return datamerge;
    }


    makeMegeData(data: any[], op = 0) {
        debugger
        let arr: any[] = [];
        let X = 3;
        data.forEach((item: any) => {
            debugger
          if (arr.length <= 0) {
            debugger
            let obj = {

              X: 3,
              X1: 3 + data.filter((e: any) => e.ControlId == item.ControlId).length - 1,
                VersionId: item.ControlId,

              group: this.getGroup(data, item.ControlId, X),
            };
            arr.push(obj);  debugger
            X = 3 + data.filter((e: any) => e.ControlId == item.ControlId).length;
            } else {
            if (
              arr.find((x: any) => x.VersionId == item.ControlId) == null
            ) {
              let obj = {
                X: X,
                X1: X + data.filter((e: any) => e.ControlId == item.ControlId).length - 1,
                  VersionDetalleId: item.VersionDetalleId,
                group: this.getGroup(data, item.VersionDetalleId, X),
              };  debugger
              arr.push(obj);
              X = X + data.filter((e: any) => e.ControlId == item.ControlId).length;
            }
          }
        });

        return arr;
      }
      getGroup(data: any[], VersionDetalleId: any, X: number): any[] {
        let arr: any[] = [];
        let dataSesion = data.filter((e: any) => e.ControlId == VersionDetalleId);
        let Y = X;  debugger
        dataSesion.forEach((item: any) => {
          if (arr.length <= 0) {
            let obj = {
              Y: Y,
              Y1: Y + dataSesion.filter((e: any) => e.ControlId == item.ControlId).length - 1,
              VersionId: item.ControlId,
            };  debugger
            arr.push(obj);
            Y = Y + dataSesion.filter((e: any) => e.ControlId == item.ControlId).length;
          } else {
            if (arr.find((x: any) => x.ControlId == item.ControlId) == null) {
              let obj = {
                Y: Y,
                Y1: Y + dataSesion.filter((e: any) => e.ControlId == item.ControlId).length - 1,
                VersionId: item.ControlId,
              };  debugger
              arr.push(obj);
              Y = Y + dataSesion.filter((e: any) => e.ControlId == item.ControlId).length;
              }
          }
        });
        return arr;
      }

}

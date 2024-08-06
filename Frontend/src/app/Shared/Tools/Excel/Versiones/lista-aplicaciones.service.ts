import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ListaAplicacionesService {
    private _workbook!: Workbook;
  constructor() { }
  async ExportarListaAplicaciones(data: any): Promise<void> {
    this._workbook = new Workbook();
    this._workbook.creator = 'J.G.A';
    await this._CreationFile(data);
    this._workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data]);
        FileSaver.saveAs(blob, 'reporte de lista de aplicaciones.xlsx');
    });
}

async _CreationFile(data: any): Promise<void> {
    // creamos una hoha
    let hoja = this._workbook.addWorksheet('Lista de aplicaciones', {
        properties: { tabColor: { argb: 'FF00FF00' } },
        views: [
            { showGridLines: false },
        ],
    });


    //asignamos columnas
    hoja.getColumn('A').width = 5;
    hoja.getColumn('B').width = 30;
    hoja.getColumn('B').alignment = { horizontal: 'center' };
    hoja.getColumn('C').width = 30;
    hoja.getColumn('D').width = 30;
    hoja.getColumn('E').width = 40;
    hoja.getColumn('F').width = 40;
    hoja.getColumn('G').width = 30;
    hoja.getColumn('H').width = 30;
    hoja.getColumn('I').width = 30;
    hoja.getColumn('J').width = 30;
    hoja.getColumn('K').width = 30;
    hoja.getColumn('L').width = 35;
    hoja.getColumn('M').width = 30;


    hoja.columns.forEach((column: any) => {
        /// Vertical ajustar texto
        /// wraptext supera el tamaño de la columna pasa a la siguiente
        column.alignment = {
            vertical: 'middle',
            wrapText: true,
            horizontal: 'center',
        };
    });


    hoja.getRow(1).values = ['', 'lISTA DE APLICACIONES'];
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
        'APLICACION',
        'FECHA DE REGISTRO',
        'ARQUITECTURA',
        'AÑO',
        'AREA',
        'LENGUAJE',
        'PLATAFORMA',
        'PROPIEDAD',
        'PROVEEDOR',
        'TIPO',
        'ULTIMA FECHA PRODUCCION',
        'ULTIMA VERSION'
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
    HeaderGrilla.getCell(6).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCAF73' },
    };
    HeaderGrilla.getCell(7).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCAF73' },
    };
    HeaderGrilla.getCell(8).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCAF73' },
    };
    HeaderGrilla.getCell(9).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCAF73' },
    };
    HeaderGrilla.getCell(10).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCAF73' },
    };
    HeaderGrilla.getCell(11).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCAF73' },
    };
    HeaderGrilla.getCell(12).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCAF73' },
    };
    HeaderGrilla.getCell(13).fill = {
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
    HeaderGrilla.getCell(6).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    HeaderGrilla.getCell(7).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    HeaderGrilla.getCell(8).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    HeaderGrilla.getCell(9).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    HeaderGrilla.getCell(10).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    HeaderGrilla.getCell(11).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    HeaderGrilla.getCell(12).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    HeaderGrilla.getCell(13).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };

    data.forEach((d: any, index: any) => {
        let Celda = hoja.addRow([
            '',
            d.Aplicacion,
            d.DateCreate,
            d.Architecture,
            d.Year,
            d.Area,
            d.Language,
            d.Platform,
            d.Property,
            d.SupplierId,
            d.Type,
            d.FechaProduccion,
            d.Version,
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
        Celda.getCell(6).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        Celda.getCell(7).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        Celda.getCell(8).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        Celda.getCell(9).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        Celda.getCell(10).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        Celda.getCell(11).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        Celda.getCell(12).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        Celda.getCell(13).border = {
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
        Celda.getCell(6).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
        Celda.getCell(7).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
        Celda.getCell(8).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
        Celda.getCell(9).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
        Celda.getCell(10).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
        Celda.getCell(11).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
        Celda.getCell(12).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
        Celda.getCell(13).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
    });
}
}

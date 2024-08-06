import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportMovimientosPerfilesService {

  constructor() { }


  private _workbook!: Workbook;

  async ExportMovmientosPerfiles(data: any): Promise<void> {
      this._workbook = new Workbook();
      this._workbook.creator = 'Altas';
      await this._CreationFile(data);
      this._workbook.xlsx.writeBuffer().then((data: any) => {
          const blob = new Blob([data]);
          FileSaver.saveAs(blob, 'reporte de Historial.xlsx');
      });
  }

  async _CreationFile(data: any): Promise<void> {
    // creamos una hoha
    let hoja = this._workbook.addWorksheet('Historial', {
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
    hoja.getColumn('D').width = 30;
    hoja.getColumn('E').width = 20;
    hoja.getColumn('F').width = 50;
    hoja.getColumn('G').width = 40;
    hoja.getColumn('H').width = 20;
    hoja.getColumn('I').width = 30;
    hoja.getColumn('J').width = 20;
    hoja.getColumn('L').width = 30;

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
        'Fecha',
        'Agencia',
        'Area Solicitante',
        'Perfil Solicitado',
        'Fecha Inicio',
        'Fecha Final',
        'Observaciones',
        'Estado',
        'Usuario creacion',
        'Fecha Creacion',
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
    data.forEach((d: any, index: any) => {
        let Celda = hoja.addRow([
            '',
        d.FechaCreate,
        d.Area,
        d.Agencia,
        d.PerfilSolicitado,
        d.FechaFin,
        d.FechaLimite,
        d.Observaciones,
        d.PerfilActual,
        d.Estado,
        d.UsuarioCreate,
        d.FechaCreate,
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
    });

}
}

import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportAltasService {

  constructor() { }


  private _workbook!: Workbook;

  async DescargaFile(data: any): Promise<void> {
      this._workbook = new Workbook();
      this._workbook.creator = 'Altas';
      await this._CreationFile(data);
      this._workbook.xlsx.writeBuffer().then((data: any) => {
          const blob = new Blob([data]);
          FileSaver.saveAs(blob, 'reporte de altas.xlsx');
      });
  }

  async _CreationFile(data: any): Promise<void> {
    // creamos una hoha
    let hoja = this._workbook.addWorksheet('Altas', {
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
    hoja.getColumn('E').width = 30;
    hoja.getColumn('F').width = 20;
    hoja.getColumn('G').width = 40;
    hoja.getColumn('H').width = 30;
    hoja.getColumn('I').width = 20;
    hoja.getColumn('J').width = 20;
    hoja.getColumn('K').width = 20;
    hoja.getColumn('L').width = 20;
    hoja.getColumn('M').width = 30;
    hoja.getColumn('N').width = 20;
    hoja.getColumn('O').width = 40;
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
        'Estado',
        'Usuario',
        'Agencia',
        'Mes',
        'Personal',
        'Cargo Personal',
        'Fecha Recepcion',
        'Fecha Atencion',
        'Fecha Ingreso Spring',
        'Fecha Cese Spring',
        'Observacion Ref.',
        'Correo',
        'Observación',
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
    HeaderGrilla.getCell(14).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FCAF73' },
    };
    HeaderGrilla.getCell(15).fill = {
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
    HeaderGrilla.getCell(14).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    HeaderGrilla.getCell(15).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
    };
    data.forEach((d: any, index: any) => {
        let Celda = hoja.addRow([
        '',
        d.FechaIngreso,
        d.EstadoDes,
        d.Usuario,
        d.Agencia,
        d.Mes,
        d.Personal,
        d.CargoPersonal,
        d.FechaRecepcion,
        d.FechaAtencion,
        d.FechaIngresoSpring,
        d.FechaCeseSpring,
        d.ObservacionRef,
        d.Correo,
        d.Observacion,
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
        Celda.getCell(14).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        Celda.getCell(15).border = {
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
        Celda.getCell(14).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
        Celda.getCell(15).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: index % 2 == 0 ? 'ffffff' : '33ECFF' },
        };
    });


}
}

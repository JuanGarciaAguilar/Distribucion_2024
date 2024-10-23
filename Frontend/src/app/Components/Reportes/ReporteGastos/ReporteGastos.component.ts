import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ReportesService } from 'src/app/Shared/Service/Reportes.service';

@Component({
  selector: 'app-ReporteGastos',
  templateUrl: './ReporteGastos.component.html',
  styleUrls: ['./ReporteGastos.component.css'],
  providers: [MessageService],
})
export class ReporteGastosComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Reporte de gastos' },
    ];
    private _MessageService = inject(MessageService);
    private _ReportesService = inject(ReportesService);

  constructor() { }
  repGastosFechaInicio: string = new Date().toDateString();
  repGastosFechaFin: string = new Date().toDateString();
  loading :boolean = true;
  reporteGastosData :any;

  totalDiesel: number = 0;
  totalPersonal: number = 0;
  totalCasa: number = 0;
  totalOtros: number = 0;
  totalSunat: number = 0;
  totalMonto: number = 0;

  ngOnInit() {
  }
  getReporte() {
    this.loading = true;
    this.totalDiesel = 0;
    this.totalPersonal = 0;
    this.totalCasa = 0;
    this.totalOtros = 0;
    this.totalSunat = 0;
    this.totalMonto = 0;
    this.reporteGastosData = [];

    this._ReportesService
      .getReporteGastos(this.repGastosFechaInicio, this.repGastosFechaFin).subscribe((data:any) => {

          this.reporteGastosData = data;
            for(let row of data){
                this.totalDiesel = this.totalDiesel + row.diesel;
                this.totalPersonal = this.totalPersonal + Number(row.personal);
                this.totalCasa = this.totalCasa + row.casa;
                this.totalOtros = this.totalOtros + row.otros;
                this.totalSunat = this.totalSunat + row.sunat;
            }
            this.totalMonto = this.totalDiesel + this.totalPersonal + this.totalCasa + this.totalOtros +            this.totalSunat;
          this.loading = false;
        },
        (error) => {
         // this.showResponseErrorToast(error);
        }
      );
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ClienteModel } from 'src/app/Shared/Models/ClienteModel';
import { CierreDiarioReportHeader } from 'src/app/Shared/Models/ReportesModel';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { ReportesService } from 'src/app/Shared/Service/Reportes.service';
import { SectorService } from 'src/app/Shared/Service/Sector.service';

@Component({
    selector: 'app-ReporteDiario',
    templateUrl: './ReporteDiario.component.html',
    styleUrls: ['./ReporteDiario.component.css'],
})
export class ReporteDiarioComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Reporte diario' },
    ];
    private _ClienteService = inject(ClienteService);
    private _SectorService = inject(SectorService);
    private _ReportesService = inject(ReportesService);
    constructor() {}
    sales: any;
    SectorData: any;
    ClientesData:ClienteModel[]=[];
    ngOnInit() {
         this.GetSectores();
          this.GetClientes();
       this.getReporteCierreDiarioCabecera();
    }


    GetSectores() {
        this._SectorService.getListaSector().subscribe((data: any) => {
            this.SectorData = data;
            console.log('sectores',data);

        });
    }

    GetClientes() {
        this._ClienteService.getListaClientes().subscribe((clientesData) => {

            this.ClientesData = clientesData;
        });
    }



    columns: CierreDiarioReportHeader[] = [];
    getReporteCierreDiarioCabecera() {
        this._ReportesService.getReporteCierreDiarioCabecera().subscribe((data: any) => {
            this.columns = data;
                console.log('columnas',data);
            });
    }

    FechaInicio:string = '';
    SectorSelected :any;
    clientes: ClienteModel[] = [];
    GetReporte(){
        this._ReportesService
        .getReporteCierreDiario(this.FechaInicio, this.SectorSelected)
        .subscribe((reporteData:any) => {

        /*   this.totalSaldoAnterior = 0;
          this.totalVenta = 0;
          this.totalAmortizacion = 0;
   */debugger
          this.clientes = this.ClientesData
            .filter((x:any) => x.sectorId == this.SectorSelected)
            .sort((a:any, b:any) => {
              const x = a.clienteName.toLowerCase();
              const y = b.clienteName.toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0;
            });
            console.log('clientes',this.ClientesData);
            console.log('clientes del reporte',this.clientes);


         /*  reporteData
            .filter((x) => x.productParentName == null)
            .forEach((x) => {
              this.totalSaldoAnterior =
                this.totalSaldoAnterior + x.deudaActualizada;
              this.totalVenta = this.totalVenta + x.total;
              this.totalAmortizacion = this.totalAmortizacion + x.amortizacion;
              this.saldo =
                this.totalSaldoAnterior +
                this.totalVenta -
                this.totalAmortizacion;
            }); */

            console.log('datos del reporte',reporteData);

       //   this.reporteCierreDiarioKendo = reporteData;
/*
          this.clientes.forEach((cli) => {
            this.kendoHeaderGroupReordenar.forEach((k) => {
              k.hijos.forEach((h) => {
                const data = reporteData.filter(
                  (r) =>
                    r.productParentName == h.title && r.clienteId == cli.clienteId
                );

                const cant = data
                  .filter((r) => r.unidadMedida == "Unidades")
                  .reduce((a, b) => b.valor, 0);
                const sol = data
                  .filter((r) => r.unidadMedida == "Soles")
                  .reduce((a, b) => b.valor, 0);

                h.cant[cli.clienteId] = cant == 0 ? null : cant;
                h.sol[cli.clienteId] = sol == 0 ? null : sol;
              });
            });
          }); */


          console.log("end");
        });
    }
}

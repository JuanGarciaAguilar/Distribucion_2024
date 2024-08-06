import { Component, OnInit } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupDescriptor, DataResult, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-rep-cierre-diario',
  templateUrl: './rep-cierre-diario.component.html',
  styleUrls: ['./rep-cierre-diario.component.css']
})
export class RepCierreDiarioComponent implements OnInit {

  constructor(public distribucionService: DistribucionService, private router: Router, private formBuilder: FormBuilder) { }

  today: string = new Date().toDateString();
  columns: any[];
  fInicio: string;
  frm: FormGroup;
  cSector: number;
  totalProductos: any[] = [];
  totalSaldoAnterior: number = 0;
  totalVenta: number = 0;
  totalAmortizacion: number = 0;
  saldo: number = 0;
  sector: any[] = [];
  equivalencia: any[] = [];
  clientes: any[] = [];
  kendoHeaderGroup: any[] = [];
  kendoHeaderGroupReordenar: any[] = [];
  cantSol: any[] = [];

  ngOnInit() {
    this.cantSol.push({ field: 'cant', title: 'Cant', width: 50 });
    this.cantSol.push({ field: 'sol', title: 'Total', width: 80 });
    this.distribucionService.getListaProductosPadre().subscribe(
      data => {
        //Reordenando para colocar el producto huevo en primera posición
        this.kendoHeaderGroupReordenar = data;
        this.kendoHeaderGroup.push(this.kendoHeaderGroupReordenar.find(x => x.productName === 'Huevo'));
        this.kendoHeaderGroupReordenar.splice(this.kendoHeaderGroupReordenar.findIndex(x => x.productName === 'Huevo'),1);
        this.kendoHeaderGroup = this.kendoHeaderGroup.concat(this.kendoHeaderGroupReordenar);
      });
    this.frm = this.formBuilder.group({
      fechaInicio: [null, [Validators.required]],
      cSector: [null, [Validators.required]]
    })
    this.listaSector();
    this.listaEquivalencia();
    this.getReporteCierreDiarioCabecera();
  }

  listaSector() {
    this.distribucionService.getListaSector().subscribe(
      data => {
        this.sector = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }

  listaEquivalencia() {
    this.distribucionService.getListaEquivalencia().subscribe(
      data => {
        this.equivalencia = data.filter(x => x.estado > 0);
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }

  getReporteCierreDiarioCabecera() {
    this.distribucionService.getReporteCierreDiarioCabecera().subscribe(
      data => {
        this.columns = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }

  reporteCierreDiarioKendo: any[];
  getReporte() {
    this.distribucionService.getListaClientes().subscribe(
      data => {
        this.clientes = data.filter(x => x.sectorId == this.cSector).sort(function (a, b) {
          var x = a.clienteName.toLowerCase();
          var y = b.clienteName.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
        this.clientes.push({ clienteId: 999999, clienteName: 'TOTAL' })
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      });

    this.distribucionService.getReporteCierreDiario(this.fInicio, this.cSector).subscribe(
      data => {
        this.reporteCierreDiarioKendo = data;

        this.columns.forEach(x => {
          let tempTitle = '';
          let tempUnidadMedida = '';
          let tempValor = 0;
          this.reporteCierreDiarioKendo.forEach(y => {
            if ((x.title == y.productParentName) && y.unidadMedida == 'Unidades') {
              tempTitle = y.productParentName;
              tempUnidadMedida = y.unidadMedida;
              tempValor = tempValor + y.valor;
            }
          })
          this.reporteCierreDiarioKendo.push({ clienteId: 999999, clienteName: 'TOTAL', productParentName: tempTitle, unidadMedida: tempUnidadMedida, valor: tempValor });
        })

        this.columns.forEach(x => {
          let tempTitle = '';
          let tempUnidadMedida = '';
          let tempValor = 0;
          this.reporteCierreDiarioKendo.forEach(y => {
            if ((x.title == y.productParentName) && y.unidadMedida == 'Soles') {
              tempTitle = y.productParentName;
              tempUnidadMedida = y.unidadMedida;
              tempValor = tempValor + y.valor;
            }
          })
          this.reporteCierreDiarioKendo.push({ clienteId: 999999, clienteName: 'TOTAL', productParentName: tempTitle, unidadMedida: tempUnidadMedida, valor: tempValor });
        })

        this.totalSaldoAnterior = 0;
        this.totalVenta = 0;
        this.totalAmortizacion = 0;
        data.filter(x => x.productParentName == null).forEach(x => {
          this.totalSaldoAnterior = this.totalSaldoAnterior + x.deudaActualizada;
          this.totalVenta = this.totalVenta + x.total;
          this.totalAmortizacion = this.totalAmortizacion + x.amortizacion;
          this.saldo = this.totalSaldoAnterior + this.totalVenta - this.totalAmortizacion;
        });
        this.reporteCierreDiarioKendo.push({ clienteId: 999999, clienteName: 'TOTAL', deudaActualizada: this.totalSaldoAnterior, total: this.totalVenta, amortizacion: this.totalAmortizacion, saldo: this.saldo });
      });
  }
}

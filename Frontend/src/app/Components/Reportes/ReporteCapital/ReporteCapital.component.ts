import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StockService } from 'src/app/Shared/Service/Stock.service';

@Component({
  selector: 'app-ReporteCapital',
  templateUrl: './ReporteCapital.component.html',
  styleUrls: ['./ReporteCapital.component.css']
})
export class ReporteCapitalComponent implements OnInit {
    private _StockService = inject(StockService);
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Reporte de Capital' },
    ];

  constructor() { }
  fechaInicio: string = '';
  fechaFin: string = '';
  CreditoTotal:number =0;
  CreditoData:any;
  ngOnInit() {

    this.GetCredito(this.fechaInicio);
    this.GetEfectivo(this.fechaInicio);
    this.getStockAll(this.fechaInicio);
  }


  GetCredito(fini:string) {
    if (this.fechaInicio == '') {
      this._StockService.getMoneyAmortizadoDeuda().subscribe((data:any) => {
        this.CreditoTotal = 0;
        this.CreditoData = data;
        for (let i = 0; i < data.length; i++) {
          this.CreditoTotal += data[i].deudaActualizada;
        }
        //this.loadingCreditos = false;
      });
    } else {
      this.fechaInicio = fini;
      this._StockService
        .getMoneyAmortizadoDeudaFechas(this.fechaInicio)
        .subscribe((data : any) => {
          this.CreditoTotal = 0;
          this.CreditoData = data;
          for (let i = 0; i < data.length; i++) {
            this.CreditoTotal += data[i].deudaActualizada;
          }
          //this.loadingCreditos = false;
        });
    }
  }

EfectivoData:number=0;
  GetEfectivo(fechaInicio :string) {


    if (this.fechaInicio == '') {
      this._StockService.getEfectivoAll().subscribe(
        (data :any) => {

         /*  for (let i = 0; i < data.length; i++) {
            this.EfectivoData += data[i].monto;

            break;
          } */
          this.EfectivoData = data?.reduce((a:any, b:any) => a + b.monto, 0);

        }
      );
    } else {
      this.fechaInicio = fechaInicio;
      this._StockService.getEfectivo(this.fechaInicio).subscribe(
        (data:any) => {

       /*    for (let i = 0; i < data.length; i++) {
            this.EfectivoData = data[i].monto;

            break;
          } */
          this.EfectivoData = data?.reduce((a:any, b:any) => a + b.monto, 0);
        }
      );
    }
  }

  StockData:any;
  totalStock:number=0;
  getStockAll(fechaInicio :string) {
    if (this.fechaInicio == '') {
      this._StockService.getStockAll().subscribe((data:any) => {
        this.StockData = data;

        console.log('ooo',data);

        this.totalStock = 0;
        this.StockData.forEach(
          (x:any) => (this.totalStock = this.totalStock + x.valorTotal)
        );

        if(this.totalStock < 0)
        {
          this.totalStock = this.totalStock * -1;
        }
      });
    } else {
      this.fechaInicio = fechaInicio;
      this._StockService
        .getStockAllFechas(this.fechaInicio)
        .subscribe((data:any) => {
          this.StockData = data;
          this.totalStock = 0;

          for (let index = 0; index < this.StockData.length; index++) {
            this.totalStock += this.StockData[index].valorTotal;
          }
          if(this.totalStock < 0)
          {
            this.totalStock = this.totalStock * -1;
          }
        });
    }
  }

}

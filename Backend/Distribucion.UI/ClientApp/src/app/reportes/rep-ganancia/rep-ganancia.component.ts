import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
import { DataService } from '../../Shared/data.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Compra } from '../../Shared/compra';
import { Producto } from '../../Shared/Producto';
import { CompraDetalle } from '../../Shared/compra-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GroupDescriptor, DataResult, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-rep-ganancia',
  templateUrl: './rep-ganancia.component.html',
  styleUrls: ['./rep-ganancia.component.css']
})
export class RepGananciaComponent implements OnInit {

  constructor(public distribucionService: DistribucionService, 
                private router: Router, 
                private formBuilder: FormBuilder) { }

  today: string = new Date().toDateString();
  fInicio: string = new Date().toDateString();
  fFin: string = new Date().toDateString();
  frm: FormGroup;
  gananciaTotal: number = 0;
  gastoTotalPeriodo: number = 0;


  listaProductos: string[] = ["Nombres"]; //, "Huevo", "Fideos Lavaggy", "Azucar", "Detergente", "Aceite", "Arroz", "Papel Higiénico", "Gelatina", "Atun", "Repelente", "Shampo", "Lacteos", "Galletas", "Harina ", "Avena", "CAFE", "Legumbres" ]
  productosPadre : any;

  ngOnInit() {
    debugger;
    this.frm = this.formBuilder.group({
      fechaInicio: [null, [Validators.required]],
      fechaFin: [null, [Validators.required]]
    })
    //this.getReporte(this.fInicio, this.fFin);
    this.distribucionService.getListaProductosPadre().subscribe(
      listaProductosPadre =>{
        debugger;
        this.productosPadre = listaProductosPadre;
        this.productosPadre.forEach(element => {
          this.listaProductos.push(element.productName);
        });
      }
    )
  }

  public reporteGanancia: any;
  getReporte(fIni: string, fFin: string) {
    
    this.distribucionService.getReporteGanancia(fIni, fFin).subscribe(
      data => {
        this.reporteGananciaKendo = null;
        this.gananciaTotal = 0;
        this.reporteGanancia = data;
        this.reporteGanancia.forEach(x => this.gananciaTotal = this.gananciaTotal + x.gananciaTotal)
        //this.reporteGanancia = this.reporteGanancia.filter(p => (p.compraTotal > 0 == true || p.ventaTotal > 0 == true)); 
        this.loadItems();
      });
    this.distribucionService.getGastoTotalPeriodo(fIni, fFin).subscribe(
      data => {
        this.gastoTotalPeriodo = 0;
        this.gastoTotalPeriodo = data;
      });
  }

  public groups: GroupDescriptor[] = [{ field: 'relevanceValue' },{ field: 'productName' }];

  public reporteGananciaKendo: DataResult;
  private loadItems(): void {
    this.reporteGananciaKendo = process(this.reporteGanancia, { group: this.groups });
  }

}

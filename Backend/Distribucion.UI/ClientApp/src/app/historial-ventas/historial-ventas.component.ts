import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DistribucionService } from '../Shared/distribucion.service';
import { Venta } from '../Shared/Venta';
import { Producto } from '../Shared/Producto';
import { Cliente } from '../Shared/Cliente';
import { GridDataResult, PageChangeEvent  } from '@progress/kendo-angular-grid';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;
@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent implements OnInit {

  constructor(public distribucionService: DistribucionService, private router: Router, private route: ActivatedRoute) { }

  sect: string;
  cliente: string;
  cliente1: Cliente;
  validarVista: boolean = false;

  ngOnInit() {
    this.distribucionService.changeValidarCambio(this.validarVista);
    this.distribucionService.currentCliente.subscribe(c => this.cliente1 = c);
    this.sect = this.route.snapshot.paramMap.get('sectorURL');
    this.cliente = this.route.snapshot.paramMap.get('clienteURL');
    this.getHistorial();
  }

  idVentaEl: number;
  enviaId(idVenta:number) {
    try {
      this.idVentaEl = idVenta;
    } catch (e) {
      console.log('Error:'+e)
    }
  }

  getHistorial() {
    this.distribucionService.getListaVentasByCliente(this.cliente).subscribe(
      data => {
        this.historialVentasTemp = data;
        this.loadItems();
      }
    );
  }

  eliminar(idVenta: number) {    
    try {
      this.distribucionService.postEliminaVenta(idVenta).subscribe(
        data => {
          this.getHistorial();
        }
      );
    } catch (e) {
      console.log('Error' + e);
    }
  }

  openMod(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }

  public historialVentasTemp: any;
  public historialVentasKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.historialVentasKendo = {
      data: this.historialVentasTemp.slice(this.skip, this.skip + this.pageSize),
      total: this.historialVentasTemp.length
    };
  }

}


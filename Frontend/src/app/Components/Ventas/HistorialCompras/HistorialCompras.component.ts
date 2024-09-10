import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { EstadoDetalle, Estados } from 'src/app/Shared/Models/Estados';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';




@Component({
    selector: 'app-HistorialCompras',
    templateUrl: './HistorialCompras.component.html',
    styleUrls: ['./HistorialCompras.component.css'],
    providers: [MessageService],
})
export class HistorialComprasComponent implements OnInit {
    private _ComprasService = inject(ComprasService);

    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Historial de Compras' },
    ];

    constructor() {}
    HistorialComprasData: any;

    estado : any;
    estadodetalle : any;
    compraid : any;
    estados: Estados[] = [];

    estadocompra: number = 0;


    ngOnInit() {
        this.GetHistorialCompras();
    }

    GetHistorialCompras() {
        this._ComprasService.getComprasAll().subscribe((data: any) => {
            for (let i = 0; i < data.length; i++) {
                data[i].index = i;

                this.estados = [];

                for (let c = 0; c < data[i].compraDetalleTabla.length; c++) {
                  if (data[i].compraDetalleTabla[c].compraEstado > 0) {
                    this.estadocompra =
                      data[i].compraDetalleTabla[c].compraEstado;

                    this.estado = new Estados();
                    this.estadodetalle = new EstadoDetalle();
                    this.estadodetalle.Estadodt = this.estadocompra;
                    this.estado.estadodtId = this.estadodetalle;

                    if (this.estados.length < 1) {
                      this.estados.push(this.estado);
                    } else {
                      if (this.estados[0].estadodtId!.Estadodt != this.estadocompra) {
                        this.estados[1] = this.estado;
                      }
                    }
                  }
                }

                if (this.estados.length == 2) {
                  data[i].compraStatus = "Recibido Parcialmente";
                  data[i].btnEstado = true;
                  data[i].compraEstado = 1;
                } else if (this.estados.length == 1) {
                  if (this.estados[0].estadodtId!.Estadodt == 1) {
                    data[i].compraStatus = "Recibido Completamente";
                    data[i].btnEstado = true;
                  } else {
                    data[i].compraStatus = "Nuevo";
                    data[i].btnEstado = false;
                  }
                  data[i].compraEstado = 1;
                } else {
                  data[i].compraEstado = 0;
                }
              }

              data = data.filter((e:any) => e.compraEstado == 1);

            this.HistorialComprasData = data;

        });
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { ReportesService } from 'src/app/Shared/Service/Reportes.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';
import autoTable, { Row } from 'jspdf-autotable';
import jsPDF from 'jspdf';
import * as _html2canvas from "html2canvas";
import * as moment from 'moment';

@Component({
    selector: 'app-ReporteVentasCliente',
    templateUrl: './ReporteVentasCliente.component.html',
    styleUrls: ['./ReporteVentasCliente.component.css'],
    providers: [MessageService],
})
export class ReporteVentasClienteComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Reporte de ventas por cliente' },
    ];

    private _ReportesService = inject(ReportesService);
    private _ClienteService = inject(ClienteService);
    private _MessageService = inject(MessageService);
    constructor() {}
    ReporteByClienteData: any;
    ReporteSelected :any;
    ClienteSelection: any;
    ClienteData: any;

    fechafin: string = '';
    fechainicio: string = '';

    loading: boolean = false;
    FechaSistema: any = moment().format("DD/MM/YYYY HH:mm:ss");

    ngOnInit() {this.GetClientes()}


    GetClientes() {
        this._ClienteService.getListaClientes().subscribe((data:any) => {

          this.ClienteData = data;
         // this.Clientes = this.datacliente;
        });
      }

    GetReporte() {
        this._ReportesService.Venta_GetByClienteFecha(this.fechainicio, this.fechafin, this.ClienteSelection.clienteId).subscribe(data => {
            this.ReporteByClienteData = data;
            console.log('data',data);

          });
    }
    NombreCliente:string = '';
    SectorDescripcion : string ='';
    UsuarioOperacion : string = '';
    DATAiMPRIMIR: any[] = [];
    TOTALNETO: number = 0;
    TOTALPAGO: number = 0;

    public DescargarPdf() {

        if (this.ReporteSelected === undefined) {

            this._MessageService.add({
                severity: 'info'
                , summary: 'Error al Exportar Informacion'
                , detail: 'No selecciono ventas'
                , key: 'Notificacion'
                , life: 5000
              });
          return
        }

        let dato = this.ClienteData.filter((f:any) => f.clienteId == this.ClienteSelection.clienteId);
        console.log('cliente',this.ClienteSelection.clienteId);

        this.NombreCliente = dato[0].clienteName;
        this.SectorDescripcion = this.ReporteByClienteData[0].sector;


        this.UsuarioOperacion = this.ReporteByClienteData[0].usuarioid;
       // this.DATAiMPRIMIR.push(this.ReporteSelected);
        for (let row of this.ReporteSelected) {

              this.TOTALNETO += (row.PrecioIngresadoVenta * row.CantidadVenta);
              this.TOTALPAGO += (row.Amortizacion);
            }
        /* for (let i = 0; i < this.ReporteByClienteData.length; i++) {
          for (let row of this.ReporteSelected) {
            if (row == i) {
              this.DATAiMPRIMIR.push(this.ReporteByClienteData[i]); //dataItem.precioIngresadoVenta * dataItem.cantidadVenta
              this.TOTALNETO += (this.ReporteByClienteData[i].PrecioIngresadoVenta * this.ReporteByClienteData[i].CantidadVenta);
              this.TOTALPAGO += (this.ReporteByClienteData[i].Amortizacion);
            }
          }
        } */

        for(let row of this.ReporteSelected){
          let nuevafecha = moment(row.FechaVenta).format('YYYY/MM/DD');
          row.nuevafecha = nuevafecha;
        }

        this.ReporteSelected.sort((a:any,b:any) => {

          if(a.nuevafecha == b.nuevafecha) {
              return 0;
            }
            if(a.nuevafecha < b.nuevafecha) {
              return -1;
            }
            return 1;
      });
        //this.DATAiMPRIMIR = [...this.DATAiMPRIMIR];

        const doc = new jsPDF();

        doc.addImage('assets/logoo.jpg', 'JPEG', 10, 5, 20, 20,);
        autoTable(doc, {

          body: [
            [
              {

                content: '',
                styles: {
                  halign: 'left',
                  fontSize: 10,
                  //textColor: '#ffffff'
                }
              },
              {
                content: 'REPORTE DE VENTAS',
                styles: {
                  halign: 'center',
                  fontSize: 14,

                  //  textColor: '#ffffff'
                }
              },
              {
                content: 'Fecha de creación' + '\n' + this.FechaSistema,
                styles: {
                  halign: 'center',
                  fontSize: 10,
                  //  textColor: '#ffffff'
                }
              },

            ],
            [
              {

                content: 'Calle Mercado 124' + '\n' + 'La Brea - Talara - Piura' + '\n' + 'Cel. 938186860',
                styles: {
                  halign: 'left',
                  fontSize: 10,
                  //  textColor: '#ffffff'
                }
              },
              {
                content: '',
                styles: {
                  halign: 'center',
                  fontSize: 10,
                  //   textColor: '#ffffff'
                }
              },
              {
                content: 'Usuario' + '\n' + this.UsuarioOperacion,
                styles: {
                  halign: 'center',
                  fontSize: 10,
                  // textColor: '#ffffff'
                }
              },

            ],

          ],

          theme: 'plain',
          styles: {
            // fillColor: '#3366ff'
          }
        });


        autoTable(doc, {
          body: [
            [
              {
                content: 'Cliente:' + '\n' + this.NombreCliente,
                styles: {
                  halign: 'left'
                }
              },
              {
                content: 'Sector:' + '\n' + this.SectorDescripcion,
                styles: {
                  halign: 'left'
                }
              },
              {
                content: 'Fecha :' + '\n'
                  + 'Desde  ' + this.fechainicio + '  hasta  ' + this.fechafin,
                styles: {
                  halign: 'left'
                }
              }
            ],
          ],
          theme: 'plain'
        });


        autoTable(doc, {
          head: [['FECHA', 'PRODUCTO', 'CANTIDAD', 'U.M', 'PRECIO', 'TOTAL', 'AMORTIZ.', 'DEUDA', 'OBSERVACION']],
          body: this.getRows(),

          theme: 'striped',
          styles: {
            halign: 'center',
            fontSize: 8,

          },
          headStyles: {
            fillColor: '#343a40',

          }
        });
        //this.DATAiMPRIMIR = [];
        this.ReporteSelected = [];
        return doc.save("Reporte de ventas de " + this.NombreCliente);

      }
      TotalDeusa: number = 0;
      getRows(): any {
        let temp: any[][] = [];
        debugger
        for (let item of this.ReporteSelected) {
          temp.push([moment(item.FechaVenta).format('DD/MM/YYYY')
                        , item.ProductName
                        , item.CantidadVenta
                        , item.UnidadMedida
                        , item.PrecioIngresadoVenta + '.00'
                        , item.PrecioIngresadoVenta * item.CantidadVenta + '.00'
                        , item.Amortizacion + '.00'
                        , item.DeudaActualizada + '.00'
                        , item.Observacion,
          ]);

          let suma = item.PrecioIngresadoVenta * item.CantidadVenta - item.Amortizacion;
          this.TotalDeusa = this.TotalDeusa + Number(suma);
        }
        temp.push(['', '', '', '', '', '', 'TOTAL', this.TotalDeusa + '.00', '', ''])
        return temp;
      }
}

import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { Equivalencia } from 'src/app/Shared/Models/equivalencia';
import { ProductoEntity } from 'src/app/Shared/Models/Producto';
import { UnidadMedidaModel } from 'src/app/Shared/Models/UnidadMedidaModel';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { UnidadMedidaService } from 'src/app/Shared/Service/UnidadMedida.service';

@Component({
    selector: 'app-Equivalencias',
    templateUrl: './Equivalencias.component.html',
    styleUrls: ['./Equivalencias.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class EquivalenciasComponent implements OnInit {

    @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
    
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de equivalencias' },
    ];

    private _ProductosService = inject(ProductosService);
    private _UnidadMedidaService = inject(UnidadMedidaService);
    private _ConfirmationService = inject(ConfirmationService);

    ProductoDescripcion: Message[] = [];
    constructor() {}
    EquivalenciaData: any;
    public listaequivalencia: any;
    public equivalenciaproductoDetail: any;
    EquivalenciasModal: boolean = false;
    b_Insert: boolean = false;
    b_Update: boolean = true;
    ngOnInit() {
        this.getProducts();
        this.loadUnidadMedida();
        this.loadUnidadMedidadestino();
    }

    public dataTempProduct: any;
    getProducts() {
        this._ProductosService.GetListaProductos().subscribe((data: any) => {
            this.dataTempProduct = data;

            this.dataTempProduct = this.dataTempProduct.filter(
                (p: any) => p.productParentId != 0
            );
            this.dataTempProduct = this.dataTempProduct.filter(
                (p: any) => p.productName != 'NONProduct'
            );
            this.EquivalenciaData = this.dataTempProduct;
            this._ProductosService
                .getListaEquivalencia()
                .subscribe((data: any) => {
                    this.listaequivalencia = data;
                    this.equivalenciaproductoDetail = data.filter(
                        (x: any) => x.estado == true
                    );

                    for (
                        let i = 0;
                        i < this.equivalenciaproductoDetail.length;
                        i++
                    ) {
                        this.equivalenciaproductoDetail[i].bloq = true;
                        this.equivalenciaproductoDetail[i].opcion = 1;
                    }

                    for (let row of this.EquivalenciaData) {
                        let UnidadBaseData =
                            this.equivalenciaproductoDetail.filter(
                                (f: any) =>
                                    f.productId == row.productId &&
                                    f.bloq == true &&
                                    f.opcion == 1
                            );
                        row.UnidadBaseData = UnidadBaseData;
                    }

                    console.log(this.EquivalenciaData);
                });
        });
    }

    PrimeraLetras(Item: string) {
        console.log('letra', Item.charAt(0));
        return Item.charAt(0);
    }

    PrimeraLetraDelete(Item: string) {
        return Item.slice(1);
    }

    EquivalenciasArrayData: any;
    SelectEquivalenciaDataAll: any;
    ProductoId: number = 0;
    SelectedEquivalenciasItem(data: any) {
        console.log('item selecionados', data);
        this.ProductoDescripcion =   [{
            severity: 'info',
            detail: 'Producto :  ' + ' ' + data.productName,
          }],
        this.ProductoId = data.productId;
        this.SelectEquivalenciaDataAll = data;
        this.EquivalenciasModal = true;
        this.EquivalenciasArrayData = data.UnidadBaseData;
    }
    listaUnidadMedida?: UnidadMedidaModel[];
    listaUnidadMedidadestino?: UnidadMedidaModel[];
    UnidadBaseSelected: any;
    unidadDestinoSelect: any;
    fleteUnit: number = 0;
    loadUnidadMedida() {
        this._UnidadMedidaService.getUnidadMedida().subscribe((data: any) => {
            this.listaUnidadMedida = data;
        });
    }

    loadUnidadMedidadestino() {
        this._UnidadMedidaService.getUnidadMedida().subscribe((data: any) => {
            this.listaUnidadMedidadestino = data;
        });
    }

    cantObj: number = 0;

    ValidadUnidadMedida() {
        if (this.listaUnidadMedida == this.unidadDestinoSelect) {
            this.cantObj = 1;
        }
    }

    SelectedDataArray: any;
    SelectItemArray(data: any) {
        this.SelectedDataArray = data;
        this.cantObj = data.cantidadObjetos;
        this.fleteUnit = data.fleteUnitario;
        this.UnidadBaseSelected = this.listaUnidadMedida?.find(
            (f: any) => f.unidadMedidad.trim() == data.unidadBase.trim()
        );
        this.unidadDestinoSelect = this.listaUnidadMedidadestino?.find(
            (f: any) => f.unidadMedidad.trim() == data.unidadDestino.trim()
        );

        this.b_Insert = true;
        this.b_Update = false;
    }

    clearfiels() {
        this.UnidadBaseSelected = [];
        this.unidadDestinoSelect = [];
        this.cantObj = 0;
        this.fleteUnit = 0;
        this.getProducts();
        this.b_Insert = false;
        this.b_Update = true;
    }

    InsertEquivalenciaArray() {
        const data = {
            productId: this.ProductoId,
            unidadBase: this.UnidadBaseSelected.unidadMedidad,
            unidadDestino: this.unidadDestinoSelect.unidadMedidad,
            fleteUnitario: this.fleteUnit,
            cantidadObjetos: this.cantObj,
        };
        this.SelectEquivalenciaDataAll.UnidadBaseData.push(data);
    }

    SelectedDataItem_Delete:any;
    DeleteItem() {
       
        this.SelectEquivalenciaDataAll.UnidadBaseData.forEach(
            (element: any, index: any) => {
                if (
                    element.unidadBase == this.SelectedDataItem_Delete.unidadBase &&
                    element.unidadDestino == this.SelectedDataItem_Delete.unidadDestino
                ) {
                    this.SelectEquivalenciaDataAll.UnidadBaseData.splice(
                        index,
                        1
                    );
                }
            }
        );

        this._ProductosService
            .EliminarEquivalencia(this.SelectedDataItem_Delete.equivalenciaId)
            .subscribe((data: any) => {
                this.getProducts();
            });
    }
    productoE?: ProductoEntity;
    editarProducto() {
        this.productoE = new ProductoEntity();
        this.productoE.productId = this.SelectEquivalenciaDataAll.productId;
        this.productoE.productName = this.SelectEquivalenciaDataAll.productName;
        this.productoE.productImage = '';
        this.productoE.unidadMedidad = '';
        this.productoE.productParentId = 0;
        this.productoE.productLevel = 0;
        this.productoE.equivalenciaDetalleTabla =
            this.SelectEquivalenciaDataAll.UnidadBaseData;
        this._ProductosService
            .ActualizaProducto(this.productoE)
            .subscribe((data: any) => {
                this.clearfiels();
                this.EquivalenciasModal =false;
            });
    }

    UpdateItemArray() {
        for (let row of this.SelectEquivalenciaDataAll.UnidadBaseData) {
            if (row.unidadBase === this.SelectedDataArray.unidadBase) {
                row.unidadBase = this.UnidadBaseSelected.unidadMedidad;
                row.unidadDestino = this.unidadDestinoSelect.unidadMedidad;
                row.fleteUnitario = this.fleteUnit;
                row.cantidadObjetos = this.cantObj;
            }
        }
        this.clearfiels();
    }

    DeleteConfirm(event: Event, data: any) {
        this.SelectedDataItem_Delete =data
        this._ConfirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Desea Elimiar la equivalencia seleccionada?',
        });
    }

    NotConfirm() {
        this.SelectedDataItem_Delete = [];
        this.confirmPopup.reject();
        this.clearfiels();
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Equivalencia } from 'src/app/Shared/Models/equivalencia';
import { UnidadMedidaModel } from 'src/app/Shared/Models/UnidadMedidaModel';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { UnidadMedidaService } from 'src/app/Shared/Service/UnidadMedida.service';

@Component({
    selector: 'app-Equivalencias',
    templateUrl: './Equivalencias.component.html',
    styleUrls: ['./Equivalencias.component.css'],
})
export class EquivalenciasComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de equivalencias' },
    ];

    private _ProductosService = inject(ProductosService);
    private _UnidadMedidaService = inject(UnidadMedidaService);

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
    SelectEquivalenciaDataAll:any;
    SelectedEquivalenciasItem(data: any) {
        this.SelectEquivalenciaDataAll =data;
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
        debugger;
        if (this.listaUnidadMedida == this.unidadDestinoSelect) {
            this.cantObj = 1;
        }
    }

    SelectedDataArray:any;
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
    }

    clearfiels(){
        this.UnidadBaseSelected = [];
        this.unidadDestinoSelect = [];
        this.cantObj = 0;
        this.fleteUnit = 0;
    }
    DataEquivalencia?:Equivalencia;
    InsertEquivalenciaArray(){
        debugger
        this.DataEquivalencia = new Equivalencia();
        this.DataEquivalencia.productId = this.SelectedDataArray.productId;
        this.DataEquivalencia.unidadBase = this.SelectedDataArray.unidadBase;
        this.DataEquivalencia.unidadDestino = this.SelectedDataArray.unidadDestino;
        this.DataEquivalencia.fleteUnitario = this.SelectedDataArray.fleteUnitario;
        this.DataEquivalencia.cantidadObjetos = this.SelectedDataArray.cantidadObjetos;
        this.EquivalenciasArrayData.push(this.DataEquivalencia);
    }
}

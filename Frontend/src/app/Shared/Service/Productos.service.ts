import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { Observable } from "rxjs";
import { ProductoEntity } from '../Models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _http = inject(HttpClient);
  private _auth = inject(AuthService);

  constructor() { }


  GetListaProductos():  Observable<any>  {
    return this._http.get(GlobalConstants.Producto ,this._auth.getHeader());
  }

  InsertaCategoria(product: ProductoEntity): any {
    return this._http.post(GlobalConstants.Producto + 'Producto/InsertCategoria', product, this._auth.getHeader());
  }

  postInsertaProducto(producto : ProductoEntity): any {
    return this._http.post(GlobalConstants.Producto + 'Producto/InsertProducto', producto,  this._auth.getHeader());
  }


  postActualizaCategoria(product: ProductoEntity): any {
    return this._http.post(GlobalConstants.Producto + 'Producto/UpdateCategoria', product,  this._auth.getHeader());
  }

  postActualizaProducto(product: ProductoEntity): any {
    return this._http.post(GlobalConstants.Producto + 'Producto/UpdateProducto', product,  this._auth.getHeader());
  }

  postEliminaCategoria(idProducto:number): any {
    return this._http.get(GlobalConstants.Producto + 'Producto/DeleteCategoria/' + idProducto,  this._auth.getHeader());
  }


  postEliminaProducto(idProducto:number): any {
    return this._http.get(GlobalConstants.Producto + 'Producto/DeleteProducto/' + idProducto,  this._auth.getHeader());
  }
}

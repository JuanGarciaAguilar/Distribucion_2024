import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { SectorModel } from '../Models/SectorModel';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  private _http = inject(HttpClient);
  private _auth = inject(AuthService);
constructor() { }



getListaSector(): any { 
  return this._http.get(GlobalConstants.Sector);
}

Insertarsector(sector: SectorModel): any {
  return this._http.post(GlobalConstants.Sector + 'InsertSector', sector, this._auth.getHeader());
}

Updatesector(sector: SectorModel): any {
  return this._http.post(GlobalConstants.Sector + 'UpdateSector', sector, this._auth.getHeader());
}

Deletesector(id:number): any {
  return this._http.delete(GlobalConstants.Sector + 'DeleteSector/' + id);
}
}

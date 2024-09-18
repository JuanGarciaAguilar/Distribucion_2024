import { Component, inject, OnInit } from '@angular/core';
import { EstadoFinanciero } from 'src/app/Shared/Models/ReportesModel';
import { ReportesService } from 'src/app/Shared/Service/Reportes.service';

@Component({
  selector: 'app-ReporteEstadosFinancieros',
  templateUrl: './ReporteEstadosFinancieros.component.html',
  styleUrls: ['./ReporteEstadosFinancieros.component.css']
})
export class ReporteEstadosFinancierosComponent implements OnInit {
    private _ReportesService = inject(ReportesService);
  constructor() { }
    ReporteData:EstadoFinanciero[]=[];
  ngOnInit() {
    this.GetReporte();
  }

 GetReporte(){

      this._ReportesService.GetReporte().subscribe((data:any)=>{
        this.ReporteData = data;
        console.log(this.ReporteData);

      });


  }

}

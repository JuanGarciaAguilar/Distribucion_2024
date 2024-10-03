import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EstadoFinanciero } from 'src/app/Shared/Models/ReportesModel'; 
import { ReportesService } from 'src/app/Shared/Service/Reportes.service';

@Component({
  selector: 'app-ReporteEstadosFinancieros',
  templateUrl: './ReporteEstadosFinancieros.component.html',
  styleUrls: ['./ReporteEstadosFinancieros.component.css']
})
export class ReporteEstadosFinancierosComponent implements OnInit {
  private _ReportesService = inject(ReportesService);

  items: MenuItem[] = [
    { icon: 'pi pi-home', route: '/' },
    { label: 'Reporte de Estado Financiero' },
];

  constructor() { }
    ReporteData:EstadoFinanciero[]=[];
    selectedSize: any = '';
    sizes!: any[];
    


  ngOnInit() {
    this.GetReporte();

    this.sizes = [
      { name: 'Pequeño', class: 'p-datatable-sm' },
      { name: 'Normal', class: '' },
      { name: 'Grande',  class: 'p-datatable-lg' }
  ];
  }

 GetReporte(){
      this._ReportesService.GetReporte().subscribe((data:any)=>{
        this.ReporteData = data;
        console.log(this.ReporteData);
      });
  } 

}

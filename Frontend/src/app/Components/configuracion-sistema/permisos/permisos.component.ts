import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';

import Swal from 'sweetalert2'; 
import { AuthService } from '../../../Shared/Service/auth.service';
import { ModuloService } from '../../../Shared/Service/modulo.service';

@Component({
    selector: 'app-permisos',
    templateUrl: './permisos.component.html',
    styleUrls: ['./permisos.component.scss'],
})
export class PermisosComponent implements OnInit {
    selectedFiles!: TreeNode[];

    selectedUser?: any;
    private _AuthService = inject(AuthService);
    private _Permisos = inject(ModuloService);
    private _router = inject(Router);
    constructor(
    ) {}

    ngOnInit(): void {
       // this.GetPersonal();
        this.GetMenu();
    }

    expandAll() {
        this.MenuData.forEach((node) => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.MenuData.forEach((node) => {
            this.expandRecursive(node, false);
        });
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach((childNode) => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }

    MenuData!: TreeNode[];
    GetMenu() {
        this._Permisos.GetMenuAsignacion().subscribe((data: any) => {
            data.forEach((itemheader: any) => {
                itemheader.children.forEach((itemchild: any) => {
                    if (itemchild.children.length === 0) {
                        delete itemchild.children;
                    }

                    if (itemchild.length > 0) {
                        itemchild.children.forEach((child: any) => {
                            if (child.children.length === 0) {
                                delete child.children;
                            }
                        });
                    }
                });
                this.MenuData = data;
            });
        });
    }
    cPersCod: string = '';
    GetModulo(event: any) {
      //  this.Loading = true;

        this.cPersCod = event.option.cPersCod;

        this._Permisos
            .GetMenuAsignacionselected(this.cPersCod)
            .subscribe((data: any) => {
           //     this.Loading = false;
                this.selectedMenuData = data;
                this.expandAll();
            });
    }

    PersonalData: any;
    selectedMenuData!: TreeNode[];

    /* async GetPersonal() {
        await this._Permisos.GetPersonalSistema().subscribe((data: any) => {
            this.PersonalData = data;
        });
    } */

/*     Loading: boolean = false;
    PermisosEnt?: PermisosEntity;
    PermisosArray: PermisosEntity[] = [];
    InsertPermisos() {
        this.PermisosArray = [];
        if (this.cPersCod == '') {
            Swal.fire('No seleccionó  algun usuario', '', 'warning');
            return;
        }

        for (let row of this.selectedMenuData) {
            this.PermisosEnt = new PermisosEntity();
            this.PermisosEnt.ModuloId = row.key;
            this.PermisosEnt.cPersCod = this.cPersCod;
            this.PermisosArray.push(this.PermisosEnt);
        }

        this._Permisos
            .InsertPermisos(this.PermisosArray)
            .subscribe((data: any) => {
                Swal.fire(
                    'Operación Exitosa',
                    'Permisos actualizados',
                    'success'
                ); 
                window.location.reload(); 
            });


            //this._router.navigate(['/Accesos/Permisos']);
    } */

    DeletePermisos(){
        this._Permisos.EliminarPermisos(this.cPersCod).subscribe((data:any)=>{
            Swal.fire(
                'Operación Exitosa',
                data.message,
                'success'
            );
            this._Permisos
            .GetMenuAsignacionselected(this.cPersCod)
            .subscribe((data: any) => {
 
                this.selectedMenuData = data;
                this.expandAll();
                window.location.reload();
            });
        });

    }

}

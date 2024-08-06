import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent implements OnInit {

    private _router = inject(Router);

    ngOnInit(): void {

    }


    IrInicio(){
        this._router.navigateByUrl('/');
    }
}

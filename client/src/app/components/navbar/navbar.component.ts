import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/store';
import { NgRedux, select } from '@angular-redux/store';
import { LOGOUT } from 'src/app/actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    
    @select() logged:boolean;

    navLinks = [
        {
            label: 'CURRENCY CONVERTER',
            path: '/converter'
        },{
            label: 'VIEW CONVERSION HISTORY',
            path: '/history'
        }];

    constructor(private redux: NgRedux<IAppState>,      
            private router:Router){}

    logout(){
        this.redux.dispatch( { type: LOGOUT } );
        this.router.navigate(['/login']);
    }
}

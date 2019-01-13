import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, log } from 'src/app/store';
import { REMOVE_CONVERSTION, UPDATE_LATEST_LOG } from 'src/app/actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})

export class HistoryComponent {

    @select() logs: any;

    displayedColumns: string[] = ['date', 'action', 'actions'];

    constructor(private redux: NgRedux<IAppState>,
        private router:Router) {
            
            if(!this.redux.getState().logged){
                this.router.navigate(['/login']);
            };
        }

    delete(log:log){
        this.redux.dispatch({ type: REMOVE_CONVERSTION,log: log });
    }

    view(log:log){
        this.redux.dispatch({ type: UPDATE_LATEST_LOG,log: log });
        this.router.navigate(['/converter']);
    }

}

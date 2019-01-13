import { Component, OnDestroy, OnInit } from '@angular/core';
import { authService } from 'src/app/services/auth.service';
import { IAppState } from 'src/app/store';
import { LOGIN } from 'src/app/actions';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

@Component({
    selector: 'login-name',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide = true;
  username= '';
  password= '';

  constructor(private _auth: authService,
      private redux: NgRedux<IAppState>,
      private router:Router) {
  }

  login(){
      if(this._auth.auth(this.username, this.password)){
        var newfullname = this._auth.getFullName(this.username);
        this.redux.dispatch( { type: LOGIN, fullname: newfullname } );
        this.router.navigate(['/converter']);
      };
  }
    

}

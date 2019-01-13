import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/login/login.component';
import { IAppState, rootReducer, INITIALSTATE } from './store';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConverterComponent } from './components/converter/converter.component';
import { HistoryComponent } from './components/history/history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authService } from './services/auth.service';
import { ratesService } from './services/rates.service';
import { HConverterComponent } from './components/historyConverter/hconverter.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ConverterComponent,
    HistoryComponent,
    HConverterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgReduxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [authService,ratesService],
  bootstrap: [AppComponent]
})

/**
 * Redux service is injected on the app main module constructor.
 */
export class AppModule {
  constructor (redux: NgRedux<IAppState>){
    redux.configureStore(rootReducer, INITIALSTATE)
  }
 }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ratesService {

    constructor(private _http: HttpClient) {}

    exchangeRatesUrl = 'https://api.nomics.com/v1/exchange-rates';

    rateHistory = 'https://api.nomics.com/v1/exchange-rates/history';
   

    myToken='3fd45c7091094c3aaf505c16e3b6627d';


    getRates(){
        return this._http.get(this.exchangeRatesUrl 
            + '?key=' + this.myToken);
    }

    getRateHistory(currency:string, days: number){

        var from = new Date();
        var date = new Date();
        from.setDate(from.getDate()-days);

        return this._http.get(this.rateHistory
            +'?key=' + this.myToken 
            +'&currency=' + currency.toUpperCase()
            +'&start=' + from.toISOString()
            +'&end=' + date.toISOString())
    }
}
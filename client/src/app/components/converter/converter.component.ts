import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { IAppState, log } from 'src/app/store';
import { ratesService } from 'src/app/services/rates.service';
import { ADD_CONVERSTION, UPDATE_LATEST_LOG } from 'src/app/actions';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.scss']
})


export class ConverterComponent{
    rates:any;

    @select() lastLog: log;

    convertAmount_raw: number;
    convertTo_raw: string;
    convertFrom_raw:string;

    result: number;
    rate:number;
    rateBack:number;

    @select() logged: boolean;

    constructor(private redux: NgRedux<IAppState>,
        private router:Router,
        private rateService: ratesService) {

        if(!this.redux.getState().logged){
            this.router.navigate(['/login']);
        };

        this.rateService.getRates()
            .subscribe(
            (data) => {
                this.rates = data;
            },
            (error) => {
                console.log(error);
            });
        }

    convertClick(){
        var rateFrom = 0;
        var rateTo = 0;
        this.rates.map((rate)=>{
            if(rate.currency == this.convertFrom_raw.toUpperCase()) 
                rateFrom = rate.rate;
            if(rate.currency == this.convertTo_raw.toUpperCase()){
                rateTo = 1/rate.rate;
            }
        });

        if(rateFrom == 0 || rateTo == 0){
            return;    
        }

        this.convert(rateFrom, rateTo);
        this.log();
    }


    log(){
        var timestamp = new Date();
        var hour = timestamp.getHours();
        var minute = timestamp.getMinutes();
        var date = timestamp.toDateString().slice(0, 10);
        var datelog = date + ' @ ' + hour + ':' + minute;
        var action = 'Converted an amount of '+ this.convertAmount_raw
        + ' from '+ this.convertFrom_raw.toUpperCase() 
        + ' to ' + this.convertTo_raw.toUpperCase();
        var user = this.redux.getState().fullname;

        var log = {date: datelog, 
            action: action, 
            user: user,
            from: this.convertFrom_raw.toUpperCase(),
            to: this.convertTo_raw.toUpperCase(),
            amount: this.convertAmount_raw,
            rate: this.rate,
            rateBack: this.rateBack,
            result: this.result}
        this.redux.dispatch( { type: ADD_CONVERSTION, log: log});
    }

    convert(rateFrom: number, rateTo: number){
        this.rate = rateFrom * rateTo;
        this.rateBack = 1/this.rate;
        this.result = this.convertAmount_raw * rateFrom * rateTo;
        this.rateBack;
    }

    switch(){
        var temp = this.convertFrom_raw;
        this.convertFrom_raw = this.convertTo_raw;
        this.convertTo_raw = temp;
    }
}

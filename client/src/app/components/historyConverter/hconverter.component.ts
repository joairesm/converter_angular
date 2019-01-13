import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ratesService } from 'src/app/services/rates.service';

@Component({
    selector: 'app-hconverter',
    templateUrl: './hconverter.component.html',
    styleUrls: ['./hconverter.component.scss']
})
export class HConverterComponent implements OnInit, OnChanges {
    
    selected = '7';
    rates:any;
    rateHistoryFrom: any;
    rateHistoryTo: any;
    rateHistoryResult: any;

    statistics: any;

    displayedColumns: string[] = ['timestamp', 'rate'];
    displayedColumnsS: string[] = ['statistic', 'value'];

    @Input('convertFrom') convertFrom: string;
    @Input('convertTo') convertTo: string;

    constructor(private rateService: ratesService) {}
    
    ngOnChanges(changes: SimpleChanges): void {
        this.resetRates();
        this.fetchHistory();
    }

    ngOnInit(): void { 
        this.resetRates();
        this.fetchHistory();
    }

    fetchHistory(){

        this.rateService.getRateHistory(
            this.convertFrom,
            Number(this.selected))
        .subscribe( 
            data => {
                this.rateHistoryFrom = data;
                if(this.rateHistoryTo.length != 0)
                    this.merge();
        },
        error => {
            console.log(error);
        });

        this.rateService.getRateHistory(
            this.convertTo,
            Number(this.selected))
        .subscribe( 
            data => {
                this.rateHistoryTo = data;
                if(this.rateHistoryFrom.length != 0)
                    this.merge();
        },
        error => {
            console.log(error);
        });

    }

    selectionChanged(){
        this.resetRates();
        this.fetchHistory();
    }

    resetRates(){
        this.rateHistoryFrom = [];
        this.rateHistoryResult = null;
        this.statistics = null;
        this.rateHistoryTo = [];
    }

    merge(){
        var finalResult = [];
        var finalRate = 0;

        var values = [];

        for(var i = 0; 
            i < this.rateHistoryFrom.length && 
            i < this.rateHistoryTo.length; 
            i++) {
                finalRate = this.rateHistoryFrom[i].rate / this.rateHistoryTo[i].rate;
                values.push(finalRate);
                finalResult.push({
                    timestamp: this.rateHistoryFrom[i].timestamp.slice(0, 10),
                    rate: finalRate
                });
            }
        this.rateHistoryResult = finalResult.reverse();

        var sum = 0;
        for(var i = 0; i < values.length; i++) {
            sum += values[i];
        }
        var average = sum / values.length;

        this.statistics = [
            { statistic: 'Lowest', value: Math.min(...values) },
            { statistic: 'Highest', value: Math.max(...values) },
            { statistic: 'Average', value: average }]
    }


}

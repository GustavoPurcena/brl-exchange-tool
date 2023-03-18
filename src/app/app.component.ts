import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { ExchangeBrlService } from './services/exchange-brl.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'BRL Exchange Rate';
  collapsedHistory: boolean = true;
  currency: string = '';
  currencyObj: any = null;
  currencyHistory: any[] = [];

  constructor(
    private exchangeBrlService: ExchangeBrlService
  ) { }

  ngOnInit(): void {
  }

  getExchange() {
    this.exchangeBrlService.getBrlExchange(this.currency).pipe(take(1)).subscribe((data) => {
      if (data.success) {
        this.currencyObj = data;
      }
    }
    );

    this.exchangeBrlService.getExchangeHistory(this.currency).pipe(take(1)).subscribe((res: any) => {
      if (res.success) {
        this.currencyHistory = res.data;
        // get only last 31 days (30 + 1 to get closing diff for day 30)
        this.currencyHistory = this.currencyHistory.slice(0, 31);
        for (let i = 0; i < 30; i++) {
          this.currencyHistory[i].closingDiff = ((this.currencyHistory[i].close - this.currencyHistory[i + 1].close) / this.currencyHistory[i + 1].close) * 100;
          this.currencyHistory[i].isPositive = Math.sign(this.currencyHistory[i].closingDiff) !== -1;
          this.currencyHistory[i].closingDiff = Math.abs(this.currencyHistory[i].closingDiff);
        }

        this.currencyHistory = this.currencyHistory.slice(0, 30);
      }
    })
  }

}

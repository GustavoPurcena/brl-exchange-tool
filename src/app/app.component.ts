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

  constructor(
    private exchangeBrlService: ExchangeBrlService
  ) { }

  ngOnInit(): void {
  }

  getExchange() {
    this.exchangeBrlService.getBrlExchange(this.currency).pipe(take(1)).subscribe(
      (data) => {
        this.currencyObj = data;
        console.log(this.currencyObj)
      }
    );
  }

}

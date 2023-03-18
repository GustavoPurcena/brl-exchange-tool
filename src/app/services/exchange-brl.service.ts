import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseAPIURL: string = 'https://api-brl-exchange.actionlabs.com.br/api/1.0';
const APIKey: string = 'RVZG0GHEV2KORLNA';

@Injectable({
  providedIn: 'root'
})
export class ExchangeBrlService {

  constructor(
    private http: HttpClient
  ) { }

  public getBrlExchange(currency: string): Observable<any> {
    let url = `${baseAPIURL}/open/currentExchangeRate?apiKey=${APIKey}&from_symbol=BRL&to_symbol=${currency}`;

    return this.http.get(url);
  }

}

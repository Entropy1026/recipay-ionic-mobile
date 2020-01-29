import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrierApiService {

  headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  // baseUrl = 'https://staging-recipay-admin-api.herokuapp.com/public/';
  // baseUrl = 'http://localhost/staging-recipay-admin-api/public/';
  baseUrl = 'http://192.168.1.5/staging-recipay-admin-api/public/';

  constructor(private http: HttpClient) { }

  getMyDelivery(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/order/mydelivery', params, { headers: this.headers });
  }

  completeDeliver(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/order/completeOrderByCarrier', params, { headers: this.headers });
  }

}

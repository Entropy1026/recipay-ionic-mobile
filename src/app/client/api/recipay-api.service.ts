import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipayApiService {

  headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  baseUrl = 'https://staging-recipay-admin-api.herokuapp.com/public/';

  constructor(private http: HttpClient) { }

  login(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/users/login', params, { headers: this.headers });
  }

  getAds() {
    return this.http.get(this.baseUrl + 'admin/ads/fetchAA', { headers: this.headers });
  }

}

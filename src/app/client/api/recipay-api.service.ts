import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipayApiService {

  headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  // baseUrl = 'https://staging-recipay-admin-api.herokuapp.com/public/';
  baseUrl = 'http://localhost/staging-recipay-admin-api/public/';

  constructor(private http: HttpClient) { }

  login(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/users/login', params, { headers: this.headers });
  }

  getMenu(): Observable<any> {
    return this.http.get(this.baseUrl + 'admin/product/category/menuList', { headers: this.headers });
  }

  getAds(): Observable<any> {
    return this.http.get(this.baseUrl + 'admin/ads/fetchAA', { headers: this.headers });
  }

  getTopSeller(): Observable<any> {
    return this.http.get(this.baseUrl + 'admin/products/fetchBySales', { headers: this.headers });
  }

  getCategory(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/product/category/listByType', params, { headers: this.headers });
  }

  getSubcategory(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/products/findbyCategory', params, { headers: this.headers });
  }

  addtoCart(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/order/addCartItem', params, { headers: this.headers });
  }

  deleteCartItems(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/order/deleteCartItem', params, { headers: this.headers });
  }

  getCartItems(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/order/getCartItems', params, { headers: this.headers });
  }

  getOrders(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/order/myorder', params, { headers: this.headers });
  }

}

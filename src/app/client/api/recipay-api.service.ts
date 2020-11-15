import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class RecipayApiService {

  channel: any;

  headers = new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  // baseUrl = 'https://staging-recipay-admin-api.herokuapp.com/public/';
  //  baseUrl = 'http://localhost/staging-recipay-admin-api/public/';
  baseUrl = 'http://192.168.1.6/staging-recipay-admin-api/public/';
  // baseUrl = 'http://192.168.1.5/staging-recipay-admin-api/public/';
  // baseUrl = 'http://192.168.0.32/staging-recipay-admin-api/public/';
  // baseUrl =  'http://localhost/RECIPAY-2020/staging-recipay-admin-api/public/';

  constructor(private http: HttpClient) {
    const pusher = new Pusher('54c8120b2564780fce9c', {
      cluster: 'ap1',
      forceTLS: true
    });
    this.channel = pusher.subscribe('recipay');
  }

  public init() {
    return this.channel;
  }

  login(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/users/login', params, { headers: this.headers });
  }
  loginViaFacebook(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/users/loginViaFacebook', params, { headers: this.headers });
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
  getMenuNew(): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/product/category/menulist', { headers: this.headers });
  }

  getSubcategory(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/products/findbyCategory', params, { headers: this.headers });
  }
  getProduct(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/products/productlist', params, { headers: this.headers });
  }
  getCuisines(): Observable<any> {
    return this.http.get(this.baseUrl + 'admin/cuisine/cuisineTypes', { headers: this.headers });
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

  order(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/order/order', params, { headers: this.headers });
  }

  receiveOrder(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/order/receiveOrder', params, { headers: this.headers });
  }

  updatePersonalInfo(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/users/updatePersonalInfo', params, { headers: this.headers });
  }

  updateEmailInfo(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/users/updateEmailInfo', params, { headers: this.headers });
  }

  updatePasswordInfo(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/users/updatePasswordInfo', params, { headers: this.headers });
  }

  updateImageInfo(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/users/updateImageInfo', params, { headers: this.headers });
  }
  addToFavorites(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/products/addFavorite', params, { headers: this.headers });
  }
  getProductDetailsById(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/products/productFindByIdAnUser', params, { headers: this.headers });
  }
  findMyOrder(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'open/order/findMyOrder', params, { headers: this.headers });
  }
  rateProduct(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/products/makeReview', params, { headers: this.headers });
  }
  reportDispute(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/dispute/createDispute', params, { headers: this.headers });
  }
  getPersonalMessage(params: any): Observable<any> {
    return this.http.post(this.baseUrl + 'admin/dispute/getPersonalMessage', params, { headers: this.headers });
  }
}

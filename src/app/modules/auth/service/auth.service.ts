import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.BASE_URL;
  private getResourceUrl = this.baseUrl + '/api/login';
  constructor(private http: HttpClient,
              private router: Router) {
  }
  authenticate(data: any): Observable<any> {
    return this.http.post(this.getResourceUrl , data, { observe: 'response'}).pipe(
      map(res => {
        return res.body;
      })
    );
  }
  logOutLocal() {
    this.deleteTokenFromStorage();
    this.router.navigateByUrl('/login');
  }
  setTokenToLocalStorage(token: string) {
    localStorage.setItem('userToken', token);
  }
  getTokenFromLocalStorage() {
    return localStorage.getItem('userToken');
  }
  deleteTokenFromStorage() {
    localStorage.removeItem('userToken');
  }

  storeHeaders(data?: any) {
    localStorage.setItem('headers', JSON.stringify(data));
  }
  getHeaders() {
    return JSON.parse(localStorage.getItem('headers'));
  }
  public isAuthenticated(): boolean {
    const token = this.getTokenFromLocalStorage();
    return !!token;
  }

}

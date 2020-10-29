import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  isActionDone: boolean;
  private isActionDoneSource = new BehaviorSubject(this.isActionDone);
  isActionDoneResponse = this.isActionDoneSource.asObservable();
  private baseUrl = environment.BASE_URL;
  private vibrantUrl = this.baseUrl + '/api/';

  getUsers(page): Observable<any> {
    return this.http.get(this.vibrantUrl + 'users?page=' + page);
  }

  getSingleUser(id): Observable<any> {
    return this.http.get(this.vibrantUrl + 'users/' + id);
  }

  addUser(body): Observable<any> {
    return this.http.post(this.vibrantUrl + 'users', body);
  }

  updateUser(body, id): Observable<any> {
    return this.http.put(this.vibrantUrl + 'users/' + id, body);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(this.vibrantUrl + 'users/' + id);
  }

  setActionDone(value) {
    this.isActionDoneSource.next(value);
  }


}

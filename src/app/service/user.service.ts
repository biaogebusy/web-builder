import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { TokenUser } from '../mobx/user/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  login(userName: string, passWord: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/vnd.api+json',
        'Content-type': 'application/json'
      }),
      withCredentials: true,
    };

    return this.http.post<any>(
      `${this.apiService.apiUrl}${this.apiService.loginPath}?_format=json`,
      {
        name: userName,
        pass: passWord,
      },
      httpOptions
    );
  }

  getCurrentUserById(user: TokenUser): Observable<any> {
    return this.http.get<any>(
      `${this.apiService.apiUrl}${this.apiService.userGetPath}?filter[drupal_internal__uid]=${user.current_user.uid}`,
      this.apiService.httpOptions(user.csrf_token)
    ).pipe(
      map(res => {
        console.log(res)
        return {
          id: res.data[0].id,
        };
      })
    );
  }

  getUser(id: string, item: string): Observable<any> {
    const csrfToken = this.apiService.getToken(item, 'csrf_token');
    return this.http.get<any>(
      `${this.apiService.apiUrl}${this.apiService.userGetPath}?filter[id]=${id}`, this.apiService.httpOptions(csrfToken)
    ).pipe(
      map(res => {
        console.log(res)
        const detail = res['data'][0];
        const info = detail.attributes;

        return {
          id: detail.id,
          display_name: info.display_name,
          mail: info.mail,
          authenticated: true,
        };
      })
    );
  }
}

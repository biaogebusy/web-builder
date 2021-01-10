import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  getNodes(type: string): Observable<any[]> {
    return this.http.get<any>(`
    ${this.apiService.apiUrl}${this.apiService.nodeGetPath}/${type}`,
      this.apiService.httpOptions(this.apiService.csrfToken)).pipe(
        map(res => {
          console.log('node', res.data);
          return res.data;
        }
        )
      );
  }

  getRelationships(api: string): Observable<any> {
    return this.http.get<any>(api, this.apiService.csrfToken);
  }
}

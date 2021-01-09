import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(
    private apiService: ApiService
  ) { }
}

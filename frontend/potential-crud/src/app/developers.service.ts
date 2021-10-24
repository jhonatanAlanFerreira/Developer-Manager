import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeveloper } from './entities/IDeveloper';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(private http: HttpClient) { }

  async devList() {
    return this.http.get<{ docs: IDeveloper[], qtd: number }>('/api/developers?limit=10').toPromise();
  }

  async devDelete(devId: string) {
    return this.http.delete(`/api/developers/${devId}`).toPromise();
  }
}

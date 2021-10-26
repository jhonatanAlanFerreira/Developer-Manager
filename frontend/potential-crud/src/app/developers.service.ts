import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeveloper } from './entities/IDeveloper';
import { environment } from '../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(private http: HttpClient) { }

  devList(page: number, name: string) {
    return this.http.get<{ docs: IDeveloper[], qtd: number }>(`/api/developers?limit=${environment.PAGINATE_SIZE}&page=${page}&nome=${name}`).toPromise();
  }

  devDelete(devId: string) {
    return this.http.delete(`/api/developers/${devId}`).toPromise();
  }

  devInsert(developer: IDeveloper) {
    return this.http.post('/api/developers', developer).toPromise();
  }

  devEdit(developer: IDeveloper, id: string) {
    return this.http.put(`/api/developers/${id}`, developer).toPromise();
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeveloper } from 'src/app/entities/IDeveloper';
import { ISort } from 'src/app/interfaces/ISort';
import { environment } from 'src/environments/environment';

const APP_URL = environment.APP_URL;

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(private http: HttpClient) { }

  devList(page: number, name: string, sort: ISort | null) {
    return this.http.get<{ docs: IDeveloper[], qtd: number }>(`${APP_URL}/api/developers?limit=${environment.PAGINATE_SIZE}&page=${page}&nome=${name}${sort ? `&orderBy=${sort.column}&direction=${sort.direction}` : ''}`).toPromise();
  }

  devDelete(devId: string) {
    return this.http.delete(`${APP_URL}/api/developers/${devId}`).toPromise();
  }

  devInsert(developer: IDeveloper) {
    return this.http.post(`${APP_URL}/api/developers`, developer).toPromise();
  }

  devEdit(developer: IDeveloper, id: string) {
    return this.http.put(`${APP_URL}/api/developers/${id}`, developer).toPromise();
  }

}

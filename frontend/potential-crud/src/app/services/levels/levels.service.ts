import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeveloper } from 'src/app/entities/IDeveloper';
import { ILevel } from 'src/app/entities/ILevel';
import { ISort } from 'src/app/interfaces/ISort';
import { environment } from 'src/environments/environment';

const APP_URL = environment.APP_URL;

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http: HttpClient) { }

  levelList(page: number, name: string, sort: ISort | null) {
    return this.http.get<{ docs: ILevel[], qtd: number }>(`${APP_URL}/api/levels?limit=${environment.PAGINATE_SIZE}&page=${page}&nivel=${name}${sort ? `&orderBy=${sort.column}&direction=${sort.direction}` : ''}`).toPromise();
  }

  levelListAll() {
    return this.http.get<{ docs: ILevel[], qtd: number }>(`${APP_URL}/api/levels?orderBy=nivel&direction=asc`, {params: {noLoading:true} }).toPromise();
  }

  levelDelete(levelId: string) {
    return this.http.delete(`${APP_URL}/api/levels/${levelId}`).toPromise();
  }

  levelInsert(level: ILevel) {
    return this.http.post(`${APP_URL}/api/levels`, level).toPromise();
  }

  levelEdit(level: ILevel, id: string) {
    return this.http.put(`${APP_URL}/api/levels/${id}`, level).toPromise();
  }
}

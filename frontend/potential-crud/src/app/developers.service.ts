import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService {

  constructor(private http: HttpClient) { }

  async devList() {
    let res = await this.http.get('/api/developers').toPromise();
    console.log(res);
  }
}

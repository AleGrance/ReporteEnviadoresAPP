import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiTicketsService {
  // URL de la API en el 245
  url: string = 'http://192.168.10.245:3000';

  constructor(public http: HttpClient) { }

  get(path: any) {
    return this.http.get(this.url + '/' + path);
  }

  post(path: any, body: any) {
    return this.http.post(this.url + '/' + path, body);
  }
}

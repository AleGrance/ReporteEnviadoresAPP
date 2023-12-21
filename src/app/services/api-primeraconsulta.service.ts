import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiPrimeraconsultaService {
  // URL de la API en el 245
  url: string = 'http://192.168.10.245:3011';

  constructor(public http: HttpClient) { }

  get(path: any) {
    return this.http.get(this.url + '/api/' + path);
  }

  post(path: any, body: any) {
    return this.http.post(this.url + '/api/' + path, body);
  }
}

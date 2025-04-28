import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CarService {
  private api = `${environment.apiBaseUrl}/cars`;
  // private api = 'http://localhost:5000/api/cars';
  constructor(private http: HttpClient) {}

  addCar(data: any) {
    return this.http.post(this.api, data);
  }

  getCars() {
    return this.http.get(this.api);
  }
}
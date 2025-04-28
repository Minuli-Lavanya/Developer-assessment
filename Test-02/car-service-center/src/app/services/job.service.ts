import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JobService {
  private api = `${environment.apiBaseUrl}/jobs`;
  //private api = 'http://localhost:5000/api/jobs';
  constructor(private http: HttpClient) {}

  addJob(data: any) {
    return this.http.post(this.api, data);
  }

  getJobs() {
    return this.http.get(this.api);
  }

  updateStatus(id: string, status: string) {
    return this.http.patch(`${this.api}/${id}`, { status });
  }
}

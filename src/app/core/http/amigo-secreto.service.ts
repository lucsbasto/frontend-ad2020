import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AmigoSecretoService {
  private base = environment.API;

  constructor(private http: HttpClient) {}

  index() {
    return this.http.get(`${this.base}/users`);
  }

  raffle() {
    return this.http.get(`${this.base}/raffle`);
  }

  delete(id) {
    return this.http.delete(`${this.base}/users/${id}`);
  }

  add(body) {
    return this.http.post(`${this.base}/users`, body);
  }

  show(id) {
    return this.http.get(`${this.base}/users/${id}`);
  }

  update(id, body) {
    return this.http.put(`${this.base}/users/${id}`, body);
  }
}

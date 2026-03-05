import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimento } from './movimento.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimentoService {

  private api = `${environment.apiUrl}/movimentos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Movimento[]> {
    return this.http.get<Movimento[]>(this.api);
  }

  buscar(id: number): Observable<Movimento> {
    return this.http.get<Movimento>(`${this.api}/${id}`);
  }

  salvar(movimento: Movimento): Observable<Movimento> {
    return this.http.post<Movimento>(this.api, movimento);
  }

  atualizar(id: number, movimento: Movimento): Observable<Movimento> {
    return this.http.put<Movimento>(`${this.api}/${id}`, movimento);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}
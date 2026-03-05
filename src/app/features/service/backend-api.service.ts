import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  private readonly API = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  listarMovimentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/movimentos`);
  }

  buscarMovimento(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/movimentos/${id}`);
  }

  criarMovimento(movimento: any): Observable<any> {
    return this.http.post<any>(`${this.API}/movimentos`, movimento);
  }

  atualizarMovimento(id: number, movimento: any): Observable<any> {
    return this.http.put<any>(`${this.API}/movimentos/${id}`, movimento);
  }

  excluirMovimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/movimentos/${id}`);
  }

  listarTreinos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/treinos`);
  }

  buscarTreino(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/treinos/${id}`);
  }

  criarTreino(treino: any): Observable<any> {
    return this.http.post<any>(`${this.API}/treinos`, treino);
  }

  atualizarTreino(id: number, treino: any): Observable<any> {
    return this.http.put<any>(`${this.API}/treinos/${id}`, treino);
  }

  excluirTreino(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/treinos/${id}`);
  }

  listarItensMovimento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/item-movimentos`);
  }

  criarItemMovimento(item: any): Observable<any> {
    return this.http.post<any>(`${this.API}/item-movimentos`, item);
  }

  excluirItemMovimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/item-movimentos/${id}`);
  }
}
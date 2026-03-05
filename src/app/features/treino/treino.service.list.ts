import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Treino } from './treino.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreinoService {

  private api = `${environment.apiUrl}/treinos`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Treino[]>(this.api);
  }

  salvar(treino: Treino) {
    return this.http.post<Treino>(this.api, treino);
  }

  atualizar(id: number, treino: Treino) {
    return this.http.put<Treino>(`${this.api}/${id}`, treino);
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

}
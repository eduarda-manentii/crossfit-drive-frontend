import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaMovimento } from '../categoria-movimento.enum';
import { Movimento } from '../movimento.model';
import { BackendApiService } from '../../service/backend-api.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movimento-form.component.html',
  styleUrls: ['./movimento-form.component.scss']
})
export class MovimentoFormComponent {

  tipos = Object.values(CategoriaMovimento);

  movimento: Movimento = {
    nome: '',
    tipo: CategoriaMovimento.WEIGHTLIFTING,
    descricao: ''
  };

  constructor(
    private backendApi: BackendApiService,
    private router: Router
  ) {}

  salvar() {
    this.backendApi.criarMovimento(this.movimento).subscribe({
      next: () => {
        this.router.navigate(['/movimentos']);
      },
      error: (err) => {
        console.error('Erro ao salvar movimento', err);
      }
    });
  }

  fechar() {
    this.router.navigate(['/movimentos']);
  }

}
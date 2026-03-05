import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaMovimento } from '../categoria-movimento.enum';
import { Movimento } from '../movimento.model';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './movimento-form.component.html',
  styleUrl: './movimento-form.component.scss'
})
export class MovimentoFormComponent {

  categorias = Object.values(CategoriaMovimento);

  movimento: Movimento = {
    nome: '',
    categoria: CategoriaMovimento.WEIGHTLIFTING,
    descricao: ''
  };

  salvar() {
    console.log(this.movimento);
  }

  fechar() {
    window.history.back();
  }

}
import { Component, OnInit } from '@angular/core';
import { MovimentoService } from '../movimento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movimento } from '../movimento.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movimento-form',
  standalone: true,
  templateUrl: './movimento-form.component.html',
  imports: [FormsModule]
})
export class MovimentoFormComponent implements OnInit {

  movimento: Movimento = {
    nome: '',
    unidadeMedida: ''
  };

  editando = false;

  constructor(
    private service: MovimentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editando = true;
      this.service.buscar(+id).subscribe(res => {
        this.movimento = res;
      });
    }
  }

  salvar() {
    if (this.editando) {
      this.service.atualizar(this.movimento.id!, this.movimento)
        .subscribe(() => this.router.navigate(['/movimentos']));
    } else {
      this.service.salvar(this.movimento)
        .subscribe(() => this.router.navigate(['/movimentos']));
    }
  }
  
}
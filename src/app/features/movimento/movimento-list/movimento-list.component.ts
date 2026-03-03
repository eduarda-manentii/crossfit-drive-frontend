import { Component, OnInit } from '@angular/core';
import { MovimentoService } from '../movimento.service';
import { Movimento } from '../movimento.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movimento-list',
  standalone: true,
  templateUrl: './movimento-list.component.html',
  imports: [
    CommonModule,
  ]
})
export class MovimentoListComponent implements OnInit {

  movimentos: Movimento[] = [];

  constructor(
    private service: MovimentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.listar().subscribe(res => {
      this.movimentos = res;
    });
  }

  editar(id: number) {
    this.router.navigate(['/movimentos/editar', id]);
  }

  excluir(id: number) {
    if (confirm('Deseja excluir?')) {
      this.service.deletar(id).subscribe(() => {
        this.carregar();
      });
    }
  }
  
}
import { Component, OnInit } from '@angular/core';
import { Treino } from '../treino';
import { TreinoService } from '../treino.service.list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-treino-list',
  imports: [CommonModule],
  templateUrl: './treino-list.component.html',
  styleUrl: './treino-list.component.scss'
})
export class TreinoList implements OnInit {

  treinos: Treino[] = [];

  constructor(
    private service: TreinoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarMovimentos();
  }

  carregarMovimentos() {
    this.service.listar().subscribe({
      next: (data) => {
        this.treinos = data;
      }
    });
  }

  excluir(id: number) {
    this.service.excluir(id).subscribe(() => {
      this.carregarMovimentos();
    });
  }

  novoTreino() {
    this.router.navigate(['/treinos/novo']);
  }
    
}
  

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
  ],
  styleUrl: './movimento-list.scss'
})
export class MovimentoListComponent implements OnInit {

  movimentos: Movimento[] = [];

  constructor(
    private service: MovimentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarMovimentos();
  }

  carregarMovimentos() {
    this.service.listar().subscribe({
      next: (data) => {
        this.movimentos = data;
      }
    });
  }

  excluir(id: number) {
    this.service.excluir(id).subscribe(() => {
      this.carregarMovimentos();
    });
  }

  novoMovimento() {
    this.router.navigate(['/movimentos/novo']);
  }
    
}
  

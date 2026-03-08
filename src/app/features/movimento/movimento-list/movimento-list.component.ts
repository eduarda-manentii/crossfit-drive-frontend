import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BackendApiService } from '../../service/backend-api.service';
import { Movimento } from '../movimento.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movimento-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movimento-list.component.html',
  styleUrls: ['./movimento-list.scss']
})
export class MovimentoListComponent implements OnInit {

  movimentos: Movimento[] = [];

  constructor(
    private backendApi: BackendApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log("LIST COMPONENT INICIADO");
    this.carregarMovimentos();
  }

  carregarMovimentos() {
    this.backendApi.listarMovimentos().subscribe({
      next: (data) => {
        this.movimentos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar movimentos', err);
      }
    });
  }

  excluir(id: number) {
    this.backendApi.excluirMovimento(id).subscribe(() => {
      this.carregarMovimentos();
    });
  }

  trackById(index: number, item: Movimento): number {
    return item.id!;
  }

  novoMovimento() {
    this.router.navigate(['/movimentos/novo']);
  }

}
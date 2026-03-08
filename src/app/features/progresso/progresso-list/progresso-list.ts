import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendApiService } from '../../service/backend-api.service';

@Component({
  selector: 'app-progresso-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './progresso-list.html',
  styleUrl: './progresso-list.scss',
})
export class ProgressoList implements OnInit {
  filtroPeriodo: number = 30;
  filtroMovimento: string = 'todos';
  movimentos: any[] = []; // Agora será preenchido

  stats = {
    diasTreinados: 0,
    totalWods: 0,
    mediaMinutos: 0
  };

  constructor(private backendApi: BackendApiService) {}

  ngOnInit(): void {
    this.carregarMovimentos(); // Busca a lista para o select
    this.carregarDados();      // Busca os treinos para os cards
  }

  carregarMovimentos() {
    // Busca a lista de movimentos (ex: Thruster, Pull up, etc)
    this.backendApi.listarMovimentos().subscribe({
      next: (data) => {
        this.movimentos = data;
      },
      error: (err) => console.error('Erro ao carregar movimentos', err)
    });
  }

  carregarDados() {
    this.backendApi.listarTreinos().subscribe(treinos => {
      // 1. Filtrar por período (ex: últimos 30 dias)
      const dataLimite = new Set();
      const hoje = new Date();
      const treinosFiltrados = treinos.filter(t => {
        const dataTreino = new Date(t.data);
        const diffDias = (hoje.getTime() - dataTreino.getTime()) / (1000 * 3600 * 24);
        
        // Filtro de Dias
        const dentroDoPeriodo = diffDias <= this.filtroPeriodo;
        
        // Filtro de Movimento Específico
        const possuiMovimento = this.filtroMovimento === 'todos' || 
                                t.movimentos.some((m: any) => m.movimentoId === Number(this.filtroMovimento));

        return dentroDoPeriodo && possuiMovimento;
      });

      // 2. Atualizar Stats com os dados filtrados
      this.stats.totalWods = treinosFiltrados.length;
      
      const totalTempo = treinosFiltrados.reduce((acc, t) => acc + (t.tempoFeito || 0), 0);
      this.stats.mediaMinutos = treinosFiltrados.length > 0 ? Math.round(totalTempo / treinosFiltrados.length) : 0;
      
      const diasUnicos = new Set(treinosFiltrados.map(t => t.data)).size;
      this.stats.diasTreinados = diasUnicos;
    });
  }
}
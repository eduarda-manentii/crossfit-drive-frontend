import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Treino } from '../treino.model';
import { TreinoService } from '../treino.service.list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackendApiService } from '../../service/backend-api.service';

@Component({
  selector: 'app-treino-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treino-list.component.html',
  styleUrls: ['./treino-list.component.scss']
})
export class TreinoList implements OnInit {
  treinos: Treino[] = [];
  expandedIndex: number | null = null;

  constructor(
    private service: TreinoService,
    private router: Router,
    private backendApi: BackendApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarTreinos();
  }

  carregarTreinos() {
    this.service.listar().subscribe({
      next: (data) => {
        this.treinos = data;
        this.cdr.detectChanges();
      }
    });
  }

  novoTreino() {
    this.router.navigate(['/treinos/novo']);
  }

  toggleExpand(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  excluirTreino(id: number | undefined) {
    if (!id) return;
    if(confirm("Deseja realmente excluir este treino?")) {
      this.backendApi.excluirTreino(id).subscribe(() => {
        this.treinos = this.treinos.filter(t => t.id !== id);
        this.cdr.detectChanges();
      });
    }
  }

  abrirMidia(url: string | undefined) {
    if (url) window.open(url, '_blank');
  }

  isVideo(url?: string): boolean {
    if (!url) return false;
    const extensions = ['.mp4', '.mov', '.avi', '.webm'];
    return extensions.some(ext => url.toLowerCase().includes(ext));
  }
}
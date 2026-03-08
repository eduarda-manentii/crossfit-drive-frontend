// treino-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BackendApiService } from '../../service/backend-api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Treino } from '../treino.model';

@Component({
  selector: 'app-treino-form',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './treino-form.html',
  styleUrls: ['./treino-form.scss'], // corrigido
})
export class TreinoForm implements OnInit {

  form!: FormGroup;
  selectedFile!: File;
  listaMovimentos: any[] = [];
  treino: Treino = {} as Treino; // adicionamos a propriedade treino

  constructor(
    private fb: FormBuilder,
    private backendApi: BackendApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      data: ['', Validators.required],
      tipo: ['', Validators.required],
      rounds: [''],
      tempoEsperado: [''],
      tempoReal: [''],
      score: [''],
      notas: [''],
      midia: [null],
      movimentos: this.fb.array([])
    });

    this.carregarMovimentos();
    this.adicionarMovimento();
  }

  carregarMovimentos() {
    this.backendApi.listarMovimentos().subscribe({
      next: (data) => this.listaMovimentos = data,
      error: (err) => console.error('Erro ao carregar movimentos', err)
    });
  }

  get movimentos(): FormArray {
    return this.form.get('movimentos') as FormArray;
  }

  adicionarMovimento() {
    const movimento = this.fb.group({
      movimentoId: ['', Validators.required],
      reps: [''],
      carga: [''],
      unidade: ['kg']
    });
    this.movimentos.push(movimento);
  }

  removerMovimento(index: number) {
    this.movimentos.removeAt(index);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.patchValue({ midia: file });
    }
  }
  
  salvar() {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const novoTreino: Treino = {
      nome: formValue.nome,
      tipo: formValue.tipo,
      data: formValue.data + "T00:00:00Z",
      repeticaoEstimada: formValue.rounds ? Number(formValue.rounds) : 0,
      repeticaoFeita: formValue.score ? Number(formValue.score) : 0,
      tempoEstimado: formValue.tempoEsperado ? Number(formValue.tempoEsperado) : 0,
      tempoFeito: formValue.tempoReal ? Number(formValue.tempoReal) : 0,
      observacao: formValue.notas,
      movimentos: formValue.movimentos.map((m: any) => ({
        movimentoId: Number(m.movimentoId),
        repeticao: m.reps ? Number(m.reps) : 0,
        carga: m.carga ? Number(m.carga) : 0,
        unidadeMedida: m.unidade
      })),
      midiaUrl: '' // inicializa vazio
    };

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.backendApi.uploadMidia(formData).subscribe({
        next: (res: any) => {
          novoTreino.midiaUrl = res.url || res.midiaUrl;
          this.treino = novoTreino; // atualiza a propriedade treino para template
          this.enviarParaSalvar(novoTreino);
        },
        error: (err) => console.error('Erro no upload:', err)
      });
    } else {
      this.treino = novoTreino; // garante que treino existe para template
      this.enviarParaSalvar(novoTreino);
    }
  }

  private enviarParaSalvar(treino: Treino) {
    this.backendApi.criarTreino(treino).subscribe({
      next: () => this.fechar(),
      error: (err) => console.error('Erro ao salvar treino', err)
    });
  }
  

  fechar() {
    this.router.navigate(['/treinos']);
  }
}
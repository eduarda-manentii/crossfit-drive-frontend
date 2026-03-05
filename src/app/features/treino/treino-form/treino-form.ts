import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-treino-form',
  imports: [ReactiveFormsModule],
  templateUrl: './treino-form.html',
  styleUrl: './treino-form.scss',
})
export class TreinoForm implements OnInit {

  form!: FormGroup;
  selectedFile!: File;

  listaMovimentos: any[] = [];

  constructor(private fb: FormBuilder) {}

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

    this.adicionarMovimento();
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log("Dados do WOD:", this.form.value);
  }

  fechar() {
    window.history.back();
  }
  
}
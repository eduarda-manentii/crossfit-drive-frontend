import { Routes } from '@angular/router';
import { MovimentoListComponent } from './features/movimento/movimento-list/movimento-list.component';
import { TreinoList } from './features/treino/treino-list/treino-list.component';
import { ProgressoList } from './features/progresso/progresso-list/progresso-list';
import { MovimentoFormComponent } from './features/movimento/movimento-form/movimento-form.component';
import { TreinoForm } from './features/treino/treino-form/treino-form';


export const routes: Routes = [
  { path: '', redirectTo: 'treinos', pathMatch: 'full' },
  { path: 'treinos',    component: TreinoList },
  { path: 'treinos/novo',  component: TreinoForm },
  { path: 'movimentos', component: MovimentoListComponent },
  { path: 'movimentos/novo', component: MovimentoFormComponent },
  { path: 'movimentos/editar/:id',  component: MovimentoFormComponent },
  { path: 'progresso', component: ProgressoList }
];
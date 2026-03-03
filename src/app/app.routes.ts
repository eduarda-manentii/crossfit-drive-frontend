import { Routes } from '@angular/router';
import { MovimentoListComponent } from './features/movimento/movimento-list/movimento-list.component';
import { TreinoList } from './features/treino/treino-list/treino-list.component';

export const routes: Routes = [
  { path: 'movimentos', component: MovimentoListComponent },
  { path: 'treinos', component: TreinoList },
  { path: '', redirectTo: 'movimentos', pathMatch: 'full' }
];
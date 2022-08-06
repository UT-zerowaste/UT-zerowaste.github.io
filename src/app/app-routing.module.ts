import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrashSelectionComponent } from './content/pages/trash-selection/trash-selection.component';
import { SelectionDetailsComponent } from './content/pages/selection-details/selection-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/selection', pathMatch: 'full' },
  { path: '*', redirectTo: '/selection', pathMatch: 'full' },
  { path: 'selection', component: TrashSelectionComponent },
  { path: 'details/:id', component: SelectionDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

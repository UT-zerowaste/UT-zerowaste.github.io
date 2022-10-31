import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrashSelectionComponent } from './content/pages/trash-selection/trash-selection.component';
import { SelectionDetailsComponent } from './content/pages/selection-details/selection-details.component';
import { ResultComponent } from './content/pages/result/result.component';
import { BinViewComponent } from './content/pages/bin-view/bin-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/selection', pathMatch: 'full' },
  { path: '*', redirectTo: '/selection', pathMatch: 'full' },
  { path: 'selection', component: TrashSelectionComponent },
  { path: 'details/:id', component: SelectionDetailsComponent },
  { path: 'bin-view/:id', component: BinViewComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashSelectionComponent } from './pages/trash-selection/trash-selection.component';
import { SelectionDetailsComponent } from './pages/selection-details/selection-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TrashSelectionComponent,
    SelectionDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ContentModule { }

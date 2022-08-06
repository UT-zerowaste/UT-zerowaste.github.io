import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashSelectionComponent } from './pages/trash-selection/trash-selection.component';
import { SelectionDetailsComponent } from './pages/selection-details/selection-details.component';
import { RouterModule } from '@angular/router';
import { UserInfoModalComponent } from './components/user-info-modal/user-info-modal.component';

@NgModule({
  declarations: [
    TrashSelectionComponent,
    SelectionDetailsComponent,
    UserInfoModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ContentModule { }

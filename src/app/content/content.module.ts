import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashSelectionComponent } from './pages/trash-selection/trash-selection.component';
import { SelectionDetailsComponent } from './pages/selection-details/selection-details.component';
import { RouterModule } from '@angular/router';
import { UserInfoModalComponent } from './components/user-info-modal/user-info-modal.component';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './pages/result/result.component';
import { BinViewComponent } from './pages/bin-view/bin-view.component';

@NgModule({
  declarations: [
    TrashSelectionComponent,
    SelectionDetailsComponent,
    ResultComponent,
    UserInfoModalComponent,
    BinViewComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class ContentModule { }

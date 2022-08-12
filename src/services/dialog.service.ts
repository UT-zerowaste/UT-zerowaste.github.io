import { ComponentType } from '@angular/cdk/overlay';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open<T>(component: ComponentType<T> | TemplateRef<T>, width: number, data = {}) {
    this.dialog.closeAll();
    this.dialog.open(component, {
      width: width + '%',
      height: 23 + '%',
      data: data,
    });
  }
  
  close() {
    this.dialog.closeAll();
  }
}

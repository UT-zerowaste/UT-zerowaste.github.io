import { Component, OnInit } from '@angular/core';
import { SelectionOption } from 'src/models/selection.model';
import { SelectionService } from 'src/services/selection.service';

@Component({
  selector: 'app-trash-selection',
  templateUrl: './trash-selection.component.html',
  styleUrls: ['./trash-selection.component.scss']
})
export class TrashSelectionComponent implements OnInit {
  selection: SelectionOption[] = [];
  constructor(private selectionService: SelectionService) { }

  ngOnInit(): void {
    this.selectionService.selection$.subscribe(data => {
      this.selection = data;
    });
  }
}

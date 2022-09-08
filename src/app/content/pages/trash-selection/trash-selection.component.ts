import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Parent } from 'src/models/selection.model';
import { SelectionService } from 'src/services/selection.service';

@Component({
  selector: 'app-trash-selection',
  templateUrl: './trash-selection.component.html',
  styleUrls: ['./trash-selection.component.scss']
})
export class TrashSelectionComponent implements OnInit {
  selection: Parent[] = [];
  constructor(private selectionService: SelectionService, private router: Router) { }

  async ngOnInit() {
    this.selectionService.getParents().then(data => {
      this.selection = data;
    });
  }

  showDetails(parentId: number, worldImpactId: number) {
    this.router.navigateByUrl("/details/" + parentId);
    localStorage.setItem("worldImpactId", worldImpactId+"");
  }
}

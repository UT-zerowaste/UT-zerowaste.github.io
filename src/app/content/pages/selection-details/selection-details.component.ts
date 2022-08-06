import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailSelection } from 'src/models/selection-detail.model';
import { SelectionOption } from 'src/models/selection.model';
import { SelectionService } from 'src/services/selection.service';

@Component({
  selector: 'app-selection-details',
  templateUrl: './selection-details.component.html',
  styleUrls: ['./selection-details.component.css']
})
export class SelectionDetailsComponent implements OnInit {
  currentSelection = new SelectionOption();
  currentDetails: DetailSelection[] = [];
  selectedDetails: DetailSelection[] = [];

  constructor(private selectionService: SelectionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let currentId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.selectionService.getSelectionOption(currentId).subscribe(data => this.currentSelection = data);

    this.selectionService.getDetails(currentId).subscribe(data => {
      this.currentDetails = data.filter(detail => detail.parentId == currentId);
     });
  }

  onDetailSelected(detail: DetailSelection) {
    let index = this.selectedDetails.findIndex(d => d.id == detail.id);
    
    // if the detail does exist, delete it, otherwise add it
    index != -1 ? this.selectedDetails.splice(index, 1): this.selectedDetails.push(detail);
    console.log(this.selectedDetails);
  }

}

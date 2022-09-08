import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailSelection } from 'src/models/selection-detail.model';
import { SelectionService } from 'src/services/selection.service';

@Component({
  selector: 'app-selection-details',
  templateUrl: './selection-details.component.html',
  styleUrls: ['./selection-details.component.scss']
})
export class SelectionDetailsComponent implements OnInit {
  selectionName: string = "";

  currentDetails: DetailSelection[] | null = null;

  selectedDetails: number[] = [];

  constructor(private selectionService: SelectionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let currentId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.selectionService.setCurrentSelectionId(currentId);

    this.selectionService.getCurrentSelectionOption().subscribe(data => this.selectionName = data.name);

    this.selectionService.getDetails(currentId).then(data => {
      this.currentDetails = data;
    });
  }

  onDetailSelected(itemId: number) {
    var text = document.getElementById('#' + itemId.toString());

    if (text!.style.display == "block") {
      text!.style.display = "none";
      this.selectedDetails = this.selectedDetails.filter(id => !(id == itemId))
    } else {
      text!.style.display = "block";
      this.selectedDetails.push(itemId);
    }
  }

}

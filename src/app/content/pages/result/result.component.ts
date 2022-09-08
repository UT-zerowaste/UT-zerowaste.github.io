import { Component, OnInit } from '@angular/core';
import { SelectionService } from 'src/services/selection.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  worldImpactMsg: string = "";
  points: number = 5;
  showPointsPage: boolean = false;
  updateUserObject = {};
  constructor(private selectionService: SelectionService, private userService: UserService) {
    let showPageVal = localStorage.getItem('showPointsPage');

    // What happens if the user deleted there local storage data
    if (showPageVal) {
      this.showPointsPage = showPageVal === "true" ? true : false;
    } else {
      this.showPointsPage = Math.random() >= 0.5 ? true : false;
      localStorage.setItem('showPointsPage', this.showPointsPage + "");
      this.updateUserObject = {...this.updateUserObject, shows_ranking: this.showPointsPage}
    }

    if (this.showPointsPage) {
      this.userService.user$.subscribe(user => {
        this.updateUserObject = {...this.updateUserObject, finish_count: user.finish_count + this.points}
        this.userService.updateUser(this.updateUserObject);
      })
    } else {
      let worldImpactId = parseInt(localStorage.getItem("worldImpactId")!);
      this.selectionService.getWorldImpact(worldImpactId).then(worldImpact => {
        this.worldImpactMsg = worldImpact.message;
      });
    }
  }

  ngOnInit(): void {}

}

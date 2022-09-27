import { Component, OnInit } from '@angular/core';
import { SelectionService } from 'src/services/selection.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  worldImpactMsg: string = "";
  points: number = 5;
  showPointsPage: boolean = false;
  updateUserObject = {};

  // Used if the user decides to clear their local storage for some reason
  DFAULT_WORLD_IMPACT_ID = "1";

  constructor(private selectionService: SelectionService, private userService: UserService) {
    this.userService.user$.subscribe(user => {
      if (user.shows_ranking == null) {
        this.showPointsPage = Math.random() > 0.5 ? true : false;
        this.updateUserObject = { ...this.updateUserObject, shows_ranking: this.showPointsPage };
      } else {
        this.showPointsPage = user.shows_ranking;
      }

      if (this.showPointsPage) {
        this.updateUserObject = { ...this.updateUserObject, finish_count: user.finish_count + this.points };
      } else {
        let worldImpactId = parseInt(localStorage.getItem("worldImpactId") ?? this.DFAULT_WORLD_IMPACT_ID);
        this.selectionService.getWorldImpact(worldImpactId).then(worldImpact => {
          this.worldImpactMsg = worldImpact.message;
        });
      }

      this.updateUserObject = { ...this.updateUserObject, successful_completions: user.successful_completions + 1 };
      this.userService.updateUser(this.updateUserObject);
    });
  }
}

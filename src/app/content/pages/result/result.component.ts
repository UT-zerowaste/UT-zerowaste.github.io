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

  DFAULT_WORLD_IMPACT_ID = "1";
  constructor(private selectionService: SelectionService, private userService: UserService) {
    this.userService.user$.subscribe(user => {
      if (user.shows_ranking == null) {
        console.log('null called')
        this.showPointsPage = Math.random() >= 0.5 ? true : false;
        this.updateUserObject = { ...this.updateUserObject, shows_ranking: this.showPointsPage }
      } else {
        this.showPointsPage = user.shows_ranking;
      }

      if (this.showPointsPage) {

        this.updateUserObject = { ...this.updateUserObject, finish_count: user.finish_count + this.points }
        this.userService.updateUser(this.updateUserObject);
  
      } else {
  
        let worldImpactId = parseInt(localStorage.getItem("worldImpactId") ?? this.DFAULT_WORLD_IMPACT_ID);
        this.selectionService.getWorldImpact(worldImpactId).then(worldImpact => {
          this.worldImpactMsg = worldImpact.message;
        });

      }
    });
  }

  ngOnInit(): void { }

}

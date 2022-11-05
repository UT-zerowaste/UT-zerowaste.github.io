import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
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
  userList: User[] | null = null;
  currentUsername = "";
  rank:string = ""

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
        this.points += user.finish_count;
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
  ngOnInit(): void {
    
     this.userService.user$.subscribe(user => {
      this.currentUsername = user.username;
      this.userService.getUsers().then(data => {
        this.userList = data;
        if (this.userList != null) {
          for(let i = 0; i < this.userList.length; i++) {
            if (this.currentUsername == this.userList[i].username) {
              this.rank = "" + (i + 1) + nth(i + 1);
              break;
            }
          }
          this.userList = this.userList.slice(0, 10);
        }
      });
      
     })
  }
}

function nth(n: number){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}


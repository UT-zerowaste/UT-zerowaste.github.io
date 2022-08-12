import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UT Sustainability';
  hasEmail: boolean = false;
  
  constructor(private userService: UserService) {
    this.userService.userEmail$.subscribe(email => this.hasEmail = email != null);
  }
}

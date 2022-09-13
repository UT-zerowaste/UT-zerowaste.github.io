import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'UT Sustainability';
  hasEmail: boolean = false;
  
  constructor(private userService: UserService, private router: Router) {
    this.userService.user$.subscribe(user => this.hasEmail = user.email != "");
  }

  ngOnInit() {
    // Whenever the app refreshes, it'll go to the default page
    this.router.navigate(['']);
  }
}

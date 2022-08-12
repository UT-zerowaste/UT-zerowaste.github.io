import { Component, OnInit } from '@angular/core';
import { UserInfoModalComponent } from 'src/app/content/components/user-info-modal/user-info-modal.component';
import { DialogService } from 'src/services/dialog.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'title-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userEmail: string | null = null;
  constructor(private dialogService: DialogService, private userService: UserService) {
    this.userService.userEmail$.subscribe(email => this.userEmail = email);
   }

  ngOnInit(): void {
    if (!this.userEmail) {
      this.openDialog();
    }
  }

  openDialog(): void {
    this.dialogService.open(UserInfoModalComponent, 60);
  }
}

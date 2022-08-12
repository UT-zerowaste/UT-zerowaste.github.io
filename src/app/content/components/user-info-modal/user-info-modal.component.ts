import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/services/dialog.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss']
})
export class UserInfoModalComponent {

  userEmail: string | null = null;
  emailVerified: boolean = false;

  emailRegex = new RegExp('[A-Za-z0-9]+@(austin\.utexas|utexas)\.edu');

  constructor(private userService: UserService, private dialogService: DialogService) {
    this.userService.userEmail$.subscribe(email => {
      this.userEmail = email;
      this.emailVerified = this.emailRegex.test(this.userEmail!);
    });
  }

  checkEmail() {
    this.emailVerified = this.emailRegex.test(this.userEmail!);
  }

  submit() {
    this.userService.setUserEmail(this.userEmail!);
    this.close();
  }

  close() {
    this.dialogService.close();
  }
}

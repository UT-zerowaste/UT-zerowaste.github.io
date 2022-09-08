import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/services/dialog.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss']
})
export class UserInfoModalComponent {

  userEmail: string | null = null;
  emailVerified: boolean = false;
  savedEmail = localStorage.getItem("userEmail") ?? null;

  emailRegex = new RegExp('[A-Za-z0-9]+@(austin\.utexas|utexas)\.edu');

  constructor(private userService: UserService, private dialogService: DialogService, private snackBarService: SnackbarService) {
    this.userService.user$.subscribe(user => {
      this.userEmail = user.email;
      this.emailVerified = this.emailRegex.test(this.userEmail!);
    });
  }

  checkEmail() {
    this.emailVerified = this.emailRegex.test(this.userEmail!);
  }

  submit() {
    this.userService.isEmailAvailable(this.userEmail!).then(isAvailable => {
      if (isAvailable) {
        // check if there's an email tha alreay exists. If not, then we know we need to create a user, else update
        this.savedEmail == null ? this.userService.createUserEmail(this.userEmail!) : this.userService.updateUserEmail(this.userEmail!);
        this.close();
      } else {
        // Snackbar Service
        this.snackBarService.show("That email has already been taken!")
      }
    });
  }

  close() {
    this.dialogService.close();
  }
}

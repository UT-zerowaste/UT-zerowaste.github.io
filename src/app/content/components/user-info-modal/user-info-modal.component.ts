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
  username: string | null = null

  emailRegex = new RegExp('[a-zA-Z]{2,4}[0-9]{4,6}');

  constructor(private userService: UserService, private dialogService: DialogService, private snackBarService: SnackbarService) {
    this.userService.user$.subscribe(user => {
      this.userEmail = user.email.toLowerCase();
      this.emailVerified = this.emailRegex.test(this.userEmail!);
    });
  }

  checkEmail() {
    this.emailVerified = this.emailRegex.test(this.userEmail!);
  }

  getRandomUsername(){
    var nameList = [
      'Time','Past','Future','Dev',
      'Fly','Flying','Soar','Soaring','Power','Falling',
      'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
      'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
      'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
      'Fear','Light','Glow','Tread',
      'Mine','Your','Worst','Enemy','Hostile','Force','Video',
      'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
      'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
      'Script','Writer','Near','Close','Open','Cube','Circle',
      'Geo','Genome','Germ','Shot','Echo','Beta','Alpha',
      'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
      'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
      'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
      'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
      'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
      'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
      'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
      'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
      'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
      'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
  ];
  var name1 = nameList[Math.floor( Math.random() * nameList.length )];
  var name2 = nameList[Math.floor( Math.random() * nameList.length )];
  var number = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  this.username = name1 + name2 + number;
  }

  submit() {
    this.userService.isEmailAvailable(this.userEmail!).then(isAvailable => {
      if (isAvailable) {
        // check if there's an email tha alreay exists. If not, then we know we need to create a user, else update
        if(this.savedEmail == null){
          this.getRandomUsername();
          this.userService.createUserEmail(this.userEmail!, this.username!);
        }else{
          this.userService.updateUserEmail(this.userEmail!);
        }
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

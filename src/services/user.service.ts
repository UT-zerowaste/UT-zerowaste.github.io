import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userEmail$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)

  constructor() {
    this.userEmail$.next(localStorage.getItem('userEmail') ?? null);
  }

  setUserEmail(email: string) {
    this.userEmail$.next(email);
    localStorage.setItem('userEmail', email);
  }
}

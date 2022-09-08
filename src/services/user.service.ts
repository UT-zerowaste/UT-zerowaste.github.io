import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../environments/environment'
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private supabase: SupabaseClient;

  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User())

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    var userEmail = localStorage.getItem('userEmail') ?? null;
    this.getUserEmail(userEmail);
  }

  async updateUserEmail(email: string) {
    var userEmail = localStorage.getItem('userEmail');

    await this.supabase
      .from('users')
      .update({ email: email }).match({ 'email': userEmail });

    localStorage.setItem('userEmail', email);

    this.user$.next({ ...this.user$.value, email: email });
  }

  // Only used when updating the points and show_rankings attributes
  async updateUser(content: {}) {
    var userEmail = localStorage.getItem('userEmail');
    await this.supabase
      .from('users')
      .update(content).match({ 'email': userEmail });
      // No nedd to update behavior subject since the user should be done with the site at this point
  }

  async createUserEmail(email: string) {
    try {
      var { data } = await this.supabase
        .from('users')
        .insert({ email: email, created_at: new Date(), shows_ranking: null, finish_count: 0 }).single();

      localStorage.setItem('userEmail', email);

      this.user$.next(data as User);
    } catch (e) {
      console.log("User may already exist");

      this.getUserEmail(email);
    }
  }

  async getUserEmail(email: string | null) {
    try {
      if (email) {
        var { data } = await this.supabase
          .from('users')
          .select('*').eq('email', email).single();
        this.user$.next(data as User);
      }
    } catch (e) {
      console.log("No user found!")
    }
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    var { data } = await this.supabase
      .from('users')
      .select('*').eq('email', email).single();
    
    return data == null;
  }
}

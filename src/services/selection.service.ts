import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DetailSelection } from 'src/models/selection-detail.model';
import { Parent } from 'src/models/selection.model';
import { WorldImpact } from 'src/models/world-impact.model';
// TODO: Make a service handle the supabase calls then used generic programming
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private supabase: SupabaseClient;

  private selection: Parent[] = [];
  private currentId: number | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  
  // List of TODO's we need to get done:
  // TODO 1?: Add in a leaderboard?
  // TODO 3: General CSS and bugfixes
  // TODO 4: World Impact list update





  //TODO: Make a generic method to accept all api calls

  setCurrentSelectionId(id: number) {
    this.currentId = id;
  }

  public getCurrentSelectionOption(): Observable<Parent> {
    return of(this.selection.find(s => s.parent_id == this.currentId)!);
  }

  async getDetails(parentId: number): Promise<DetailSelection[]> {
    var { data } = await this.supabase
      .from('child')
      .select('*').eq('parent_id', parentId);
    return data as DetailSelection[];
  }

  async getWorldImpact(worldImpactId: number): Promise<WorldImpact> {
    var { data } = await this.supabase
      .from('world_impact')
      .select('*').eq("id", worldImpactId).single();
    return data as WorldImpact;
  }

  async getParents(): Promise<Parent[]> {
    if (this.selection.length > 0) {
      return this.selection;
    }

    var { data } = await this.supabase
      .from('parent')
      .select('*');
    this.selection = data as Parent[];
    return this.selection;
  }
}

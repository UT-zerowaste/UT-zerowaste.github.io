import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DetailSelection } from 'src/models/selection-detail.model';
import { SelectionOption } from 'src/models/selection.model';


@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selection: SelectionOption[] = [ 
  {id: 1, name: 'coffee'}, 
  {id: 2, name: 'pizza box'}, 
  {id: 3, name: 'banana'}, 
  {id: 4, name: 'apple'}, 
  {id: 5, name: 'food container'},
  {id: 6, name: 'tea'},
  {id: 7, name: 'plastic bag'},
  {id: 8, name: 'bottled water'},
  {id: 9, name: 'straws'},
  {id: 10, name: 'glass bottles'},
  {id: 11, name: 'book'},
  {id: 12, name: 'toy'},
];

private details: DetailSelection[] = [ 
  {id: 1, parentId: 1, name: 'coffee', points: 5},
  {id: 2, parentId: 1, name: 'cup', points: 10},
  {id: 3, parentId: 1, name: 'sleeve', points: 5},
  {id: 4, parentId: 1, name: 'lid', points: 5},
  {id: 5, parentId: 2, name: 'box', points: 15},
  {id: 6, parentId: 2, name: 'paper', points: 5},
];



  public selection$: BehaviorSubject<SelectionOption[]> = new BehaviorSubject<SelectionOption[]>([]);
  public details$: BehaviorSubject<DetailSelection[]> = new BehaviorSubject<DetailSelection[]>(this.details);

  constructor() {
    this.getSelectionOptions();
   }

  getSelectionOptions() {
    // api call here
    this.selection$.next(this.selection);
  }

  getSelectionOption(id: number): Observable<SelectionOption> {
    // api call here
    return of(this.selection.find(s => s.id == id)!);

  }

  getDetails(parentId: number): Observable<DetailSelection[]> {
    // get details given a parentId through an api maybe
    return this.details$.asObservable();
  }
}

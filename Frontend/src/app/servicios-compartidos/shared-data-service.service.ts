import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private searchValueSource = new BehaviorSubject<string>('');
  searchValue$ = this.searchValueSource.asObservable();

  constructor() { }

  updateSearchValue(value: string) {
    this.searchValueSource.next(value);
  }
}

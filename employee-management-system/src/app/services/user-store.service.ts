import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private username$ = new BehaviorSubject<string>('');

  public getUser() {
    return this.username$.asObservable();
  }
  public setUser(name: string) {
    this.username$.next(name);
  }
  
}

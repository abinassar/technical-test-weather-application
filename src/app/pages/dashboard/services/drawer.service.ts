import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  toggleSidenav: Subject<void> = new Subject();
  toggleSidenav$ = this.toggleSidenav.asObservable();

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleBarService {
  sideBarOpen = false;

  constructor() { }
}

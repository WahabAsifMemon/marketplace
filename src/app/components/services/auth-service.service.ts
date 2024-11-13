import {  Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private popupState = new Subject<string>();

  // Observable to listen to popup state changes
  popupState$ = this.popupState.asObservable();

  // Method to open the popup and pass the active tab (either 'login' or 'signup')
  openPopup(tab: string) {
    this.popupState.next(tab);
  }
}

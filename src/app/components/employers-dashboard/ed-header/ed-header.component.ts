import { Component, ViewChild } from '@angular/core';
import { AuthPopupComponent } from '../../common/auth-popup/auth-popup.component';

@Component({
    selector: 'app-ed-header',
    templateUrl: './ed-header.component.html',
    styleUrls: ['./ed-header.component.scss']
})
export class EdHeaderComponent {

    @ViewChild(AuthPopupComponent) authPopup!: AuthPopupComponent;

    constructor() { }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

     // Modal Popup
     isOpen = false;
     openPopup(): void {
         this.isOpen = true;
     }
     closePopup(): void {
         this.isOpen = false;
     } 
 
     // Tabs 1
     currentTab = 'tab1';
     switchTab(event: MouseEvent, tab: string) {
         event.preventDefault();
         this.currentTab = tab;
     }
 
     // Tabs 2
     currentInnerTab = 'innerTab1';
     switchInnerTab(event: MouseEvent, tab: string) {
         event.preventDefault();
         this.currentInnerTab = tab;
     }

}
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-candidate-details-page',
    templateUrl: './candidate-details-page.component.html',
    styleUrls: ['./candidate-details-page.component.scss']
})
export class CandidateDetailsPageComponent {

    title = 'Candidate Details - Jove';
 
    constructor(private titleService:Title) {}
    
    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

    @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

    videoUrls = ['../../../../assets/video/community-Popup.mp4', '../../../../assets/video/Rent-Popup.mp4', '../../../../assets/video/sell-Popup.mp4'];
    currentVideoIndex = 0;

}
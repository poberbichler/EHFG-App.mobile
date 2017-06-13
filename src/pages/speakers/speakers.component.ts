import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Speaker} from "../../data/speaker";
import {SpeakerService} from "../../service/speakers.service";
import {SpeakerDetailPage} from "../speaker-detail/speaker-detail.component";

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html'
})
export class SpeakersPage implements OnInit {
  speakers: Speaker[];
  private allSpeakers: Speaker[];

  constructor(private navCtrl: NavController, private speakerService: SpeakerService) {
  }

  ngOnInit(): void {
    this.getSpeakers();
  }

  public showDetails(speaker: Speaker): void {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }

  filterSpeakers(event: any ): void {
    let filterTerm = event.target.value;

    if (filterTerm && filterTerm.trim()) {
      this.speakers = this.allSpeakers.filter(speaker => {
        return speaker.fullName.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1;
      });
    } else {
      this.speakers = this.allSpeakers;
    }
  }

  private getSpeakers() {
    this.speakerService.getSpeakers().then(speakers => {
      this.speakers = speakers;
      this.allSpeakers = speakers;
    });
  }
}

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

  constructor(private navCtrl: NavController, private speakerService: SpeakerService) {}

  ngOnInit(): void {
    this.getSpeakers();
  }

  public showDetails(speaker: Speaker): void {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }

  private getSpeakers() {
    this.speakerService.getSpeakers().then(speakers => this.speakers = speakers);
  }
}

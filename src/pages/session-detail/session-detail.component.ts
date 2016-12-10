import {Component} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {Session} from "../../data/conferenceday";
import {Speaker} from "../../data/speaker";
import {SpeakerService} from "../../service/speakers.service";
import {SpeakerDetailPage} from "../speaker-detail/speaker-detail.component";

@Component({
  selector: 'page-sessions-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: Session;
  speakers: Speaker[];

  constructor(private navCtrl: NavController, private params: NavParams, private speakerService: SpeakerService) {
    this.session = params.data;
    speakerService.getSpeakersForSession(this.session).then(s=> this.speakers = s);
  }

  showSpeakerDetail(speaker: Speaker): void {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }
}

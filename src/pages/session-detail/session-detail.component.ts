import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Session} from "../../data/session";
import {Speaker} from "../../data/speaker";
import {SpeakerService} from "../../service/speakers.service";
import {SpeakerDetailPage} from "../speaker-detail/speaker-detail.component";
import {SessionService} from "../../service/sessions.service";

@Component({
  selector: 'page-sessions-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: Session;
  speakers: Speaker[];

  constructor(private navCtrl: NavController, private params: NavParams, private speakerService: SpeakerService,
              private sessionService: SessionService) {
    this.session = params.data;
    speakerService.getSpeakersForSession(this.session)
      .subscribe(speakers => this.speakers = speakers);
  }

  showSpeakerDetail(speaker: Speaker): void {
    this.navCtrl.push(SpeakerDetailPage, speaker);
  }

  toggleFavouriteSession(): void {
    this.sessionService.toggleFavouriteSession(this.session.id)
      .then(result => this.session.favourite = result);
  }
}

import {NavParams, NavController} from "ionic-angular";
import {Speaker} from "../../data/speaker";
import {Component} from "@angular/core";
import {SessionService} from "../../service/sessions.service";
import {Session} from "../../data/conferenceday";
import {SessionDetailPage} from "../session-detail/session-detail.component";

@Component({
  templateUrl: 'speaker-detail.html',
  selector: 'page-speaker-detail'
})
export class SpeakerDetailPage {
  speaker: Speaker;
  sessions: Session[];

  constructor(private navCtrl: NavController, private params: NavParams, private sessionService: SessionService) {
    this.speaker = params.data;
    this.sessionService.getSessionForSpeaker(this.speaker).then(s => this.sessions = s);
  }

  showSessionDetail(session: Session): void {
    this.navCtrl.push(SessionDetailPage, session);
  }
}

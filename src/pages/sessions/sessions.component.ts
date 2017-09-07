import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {SessionService} from "../../service/sessions.service";
import {ConferenceDay} from "../../data/conferenceday";
import {Session} from "../../data/session";
import {SessionDetailPage} from "../session-detail/session-detail.component";

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class SessionsPage implements OnInit {
  dayMap: Map<string, ConferenceDay>;

  showAllSessions: string = "true";

  days: string[];

  constructor(private navCtrl: NavController, private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.getSessions();
  }

  private getSessions(): void {
    this.sessionService.getSessions().subscribe(dayMap => {
      this.dayMap = dayMap;
      this.days = Object.keys(dayMap);
    });
  }

  showDetails(session: Session): void {
    this.navCtrl.push(SessionDetailPage, session);
  }

  updateSessions(): void {
    if (this.showAllSessions === 'true') {
      Object.keys(this.dayMap).forEach(key => {
        this.dayMap[key].hidden = false;
      });
    }

    else {
      Object.keys(this.dayMap).forEach(key => {
        let day = this.dayMap[key];

        let showDay: boolean = false;
        day.sessions.forEach(session => {
          showDay = showDay || (session.favourite !== undefined && session.favourite);
        });

        day.hidden = !showDay;
      });
    }
  }
}

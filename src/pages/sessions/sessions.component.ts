import {Component, OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import {SessionService} from "../../service/sessions.service";
import {ConferenceDay, Session} from "../../data/conferenceday";
import {SessionDetailPage} from "../session-detail/session-detail.component";

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class SessionsPage implements OnInit {
  dayMap: Map<string, ConferenceDay>;
  days: string[];

  constructor(private navCtrl: NavController, private sessionService: SessionService) { }

  public getSessionsForDay(day: string): Session[] {
    return this.dayMap[day].sessions;
  }

  getSessions(): void {
    this.sessionService.getSessions().then(dayMap => {
      this.dayMap = dayMap;
      this.days = Object.keys(dayMap);
    });
  }

  showDetails(session: Session): void {
    this.navCtrl.push(SessionDetailPage, session);
  }

  ngOnInit(): void {
    this.getSessions();
  }
}

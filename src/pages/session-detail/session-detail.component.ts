import {Component, OnInit} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Session} from "../sessions/conferenceday";

@Component({
  selector: 'page-sessions-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: Session;

  constructor(private params: NavParams) {
    this.session = params.data;
    console.log(this.session);
  }
}

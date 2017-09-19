import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {Globals} from "../../service/globals.service";
import {SpeakerDetailPage} from "../speaker-detail/speaker-detail.component";
import {SessionDetailPage} from "../session-detail/session-detail.component";
import {SpeakerService} from "../../service/speakers.service";
import {SessionService} from "../../service/sessions.service";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  searchTerm: string;
  searchResult: any;
  hasAnyResult: boolean = false;

  constructor(private navParams: NavParams,
              private http: Http,
              private globals: Globals,
              private navCtrl: NavController,
              private speakerService: SpeakerService,
              private sessionService: SessionService) {
    this.searchTerm = navParams.data;
    this.http.get(this.globals.baseUrl + `search/${this.searchTerm}`).subscribe(result => {
      this.searchResult = result.json();
      this.hasAnyResult = this.hasAnyTweets(this.searchResult) || this.hasAnyOtherResult(this.searchResult);
    });
  }

  public showDetails(item: any) {
    if (item.type === "SPEAKER") {
      this.speakerService.getSpeakerById(item.id).subscribe(speaker => {
        this.navCtrl.push(SpeakerDetailPage, speaker);
      });
    } else if (item.type === "SESSION") {
      this.sessionService.getSessionById(item.id).subscribe(session => {
        this.navCtrl.push(SessionDetailPage, session);
      });
    }
  }

  private hasAnyOtherResult(searchResult: any) {
    return searchResult.results.filter(it => it.data.length !== 0).length !== 0;
  }

  private hasAnyTweets(searchResult: any) {
    return searchResult.tweets.length !== 0;
  }
}

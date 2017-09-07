import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {Globals} from "./globals.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TwitterService {
  static readonly SHOW_RETWEETS_TOPIC = "ehfg-app-showRetweetsChanged";

  constructor(private http: Http,
              private globals: Globals) {
  }

  getTweetPage(page: number): Observable<any> {
    return this.http.get(this.globals.baseUrl + `twitter/page/${page}`)
      .map(response => response.json());
  }

  getTweets(): Observable<any> {
    return this.getTweetPage(0);
  }

  updateTweets(timestamp: any): Observable<any> {
    return this.http.get(this.globals.baseUrl + `twitter/update/${timestamp}`)
      .map(response => response.json());
  }

  updateTweetsById(id: string): Observable<any> {
    return this.http.get(this.globals.baseUrl + `twitter/update/id/${id}`)
      .map(response => response.json());
  }
}

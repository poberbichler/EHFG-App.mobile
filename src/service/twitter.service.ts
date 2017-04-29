import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

@Injectable()
export class TwitterService {
  static readonly SHOW_RETWEETS_TOPIC = "ehfg-app-showRetweetsChanged";

  constructor(private http: Http) {
  }

  getTweetPage(page: number): Promise<any> {
    return this.http.get(`https://backend-ehfg.rhcloud.com/rest/twitter/page/${page}`)
      .toPromise()
      .then(response => response.json());
  }

  getTweets(): Promise<any> {
    return this.getTweetPage(0);
  }

  updateTweets(timestamp: any): Promise<any> {
    return this.http.get(`https://backend-ehfg.rhcloud.com/rest/twitter/update/${timestamp}`)
      .toPromise()
      .then(response => response.json());
  }

  updateTweetsById(id: string): Promise<any> {
    return this.http.get(`https://backend-ehfg.rhcloud.com/rest/twitter/update/id/${id}`)
      .toPromise()
      .then(response => response.json());
  }
}

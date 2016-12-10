import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TwitterService {
  constructor(private http: Http) { }

  getTweets(): Promise<any> {
    return this.http.get("https://backend-ehfg.rhcloud.com/rest/twitter/page/0")
      .toPromise()
      .then(response => response.json());
  }
}

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TwitterService {
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

}

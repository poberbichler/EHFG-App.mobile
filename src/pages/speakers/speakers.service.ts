import {Injectable} from "@angular/core";
import {Speaker} from "./speaker";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class SpeakerService {
  constructor(private http: Http) { }

  getSpeakers(): Promise<Speaker[]> {
    return this.http.get("https://backend-ehfg.rhcloud.com/rest/speakers")
      .toPromise()
      .then(response => response.json() as Speaker[]);
  }
}

import {Injectable} from "@angular/core";
import {Speaker} from "./speaker";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {Session} from "../sessions/conferenceday";


@Injectable()
export class SpeakerService {
  constructor(private http: Http) { }

  getSpeakers(): Promise<Speaker[]> {
    return this.http.get("https://backend-ehfg.rhcloud.com/rest/speakers")
      .toPromise()
      .then(response => response.json() as Speaker[]);
  }

  getSpeakersForSession(session: Session): Promise<Speaker[]> {
    return this.getSpeakers().then(speakers => {
      return speakers.filter(speaker => session.speakers.indexOf(speaker.id) !== -1)
    });
  }
}

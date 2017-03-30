import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Speaker} from "../data/speaker";
import {Session} from "../data/session";
import "rxjs/add/operator/toPromise";


@Injectable()
export class SpeakerService {
  private speakers: any;

  constructor(private http: Http) {
  }

  getSpeakers(): Promise<Speaker[]> {
    if (this.speakers) {
      return Promise.resolve(this.speakers);
    }

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

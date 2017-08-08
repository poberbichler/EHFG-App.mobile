import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Speaker} from "../data/speaker";
import {Session} from "../data/session";
import "rxjs/add/operator/toPromise";
import {Globals} from "./globals.service";


@Injectable()
export class SpeakerService {
  private speakers: any;

  constructor(private http: Http, private globals: Globals) {
  }

  getSpeakers(): Promise<Speaker[]> {
    if (this.speakers) {
      return Promise.resolve(this.speakers);
    }

    return this.http.get(this.globals.baseUrl + "speakers")
      .toPromise()
      .then(response => response.json() as Speaker[])
      .then(data => this.speakers = data)
  }

  getSpeakersForSession(session: Session): Promise<Speaker[]> {
    return this.getSpeakers().then(speakers => {
      return speakers.filter(speaker => session.speakers.indexOf(speaker.id) !== -1)
    });
  }

  getSpeakerById(id: string): Promise<Speaker> {
    return this.getSpeakers().then(speakers => {
      return speakers.filter(speaker => speaker.id === id)[0];
    });
  }
}

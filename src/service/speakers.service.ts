import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Speaker} from "../data/speaker";
import {Session} from "../data/session";
import "rxjs/add/operator/toPromise";
import {Globals} from "./globals.service";
import {CacheService} from "ionic-cache";


@Injectable()
export class SpeakerService {
  constructor(private http: Http, private globals: Globals, private cache: CacheService) {
  }

  getSpeakers(): Promise<Speaker[]> {
    return this.cache.loadFromObservable("ehfg-app-speakers", this.http.get(this.globals.baseUrl + "speakers"))
      .map(response => response.json() as Speaker[])
      .toPromise();
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

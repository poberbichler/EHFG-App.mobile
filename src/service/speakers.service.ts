import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Speaker} from "../data/speaker";
import {Session} from "../data/session";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/mergeMap";
import {Globals} from "./globals.service";
import {CacheService} from "ionic-cache";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SpeakerService {
  constructor(private http: Http,
              private globals: Globals,
              private cache: CacheService) {
  }

  private loadSpeakers(): Observable<Speaker> {
    return this.cache.loadFromObservable("ehfg-app-speakers", this.http.get(this.globals.baseUrl + "speakers"))
      .map(request => request.json())
      .flatMap(speaker => speaker);
  }

  getSpeakerList(): Observable<Speaker[]> {
    return this.loadSpeakers().toArray();
  }

  getSpeakersForSession(session: Session): Observable<Speaker[]> {
    return this.loadSpeakers()
      .filter(speaker => session.speakers.indexOf(speaker.id) !== -1)
      .toArray();
  }

  getSpeakerById(id: string): Observable<Speaker> {
    return this.loadSpeakers()
      .filter(speaker => speaker.id === id)
      .first();
  }
}

import {Injectable} from "@angular/core";
import {ConferenceDay} from "../data/conferenceday";
import {Http} from "@angular/http";
import {Speaker} from "../data/speaker";
import {Session} from "../data/session";
import {Storage} from "@ionic/storage";
import {Globals} from "./globals.service";
import {CacheService} from "ionic-cache";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/do";

@Injectable()
export class SessionService {
  private readonly FAVOURITE_SESSION: string = "favouriteSessionIds";

  constructor(private http: Http,
              private storage: Storage,
              private globals: Globals,
              private cache: CacheService) {
  }

  getFavouriteSessions(): Promise<string[]> {
    return this.storage.get(this.FAVOURITE_SESSION).then(arrayFromStorage => {
      return Promise.resolve(arrayFromStorage || []);
    });
  }

  private updateFavouriteSessions(data: Map<string, ConferenceDay>): void {
    this.getFavouriteSessions().then(favouriteSessions => {
      Object.keys(data).map(key => data[key].sessions)
        .reduce((x,y) => x.concat(y), []) // flatMap
        .forEach(session => session.favourite = favouriteSessions.indexOf(session.id) !== -1);
    });
  }

  getSessions(): Observable<Map<string, ConferenceDay>> {
    return this.cache.loadFromObservable("ehfg-app-sessions", this.http.get(this.globals.baseUrl + "sessions"))
      .map(request => request.json())
      .do(data => this.updateFavouriteSessions(data));
  }

  getSessionById(id: string): Observable<Session> {
    return this.getSessions()
      .flatMap(data => Object.keys(data).map(key => data[key].sessions))
      .flatMap(data => data)
      .filter((session: Session) => session.id === id)
      .first();
  }

  getSessionForSpeaker(speaker: Speaker): Observable<Session[]> {
    return this.getSessions()
      .flatMap(data => Object.keys(data).map(key => data[key].sessions))
      .flatMap(data => data)
      .filter((session: Session) => session.speakers.indexOf(speaker.id) !== -1)
      .toArray();
  }

  isFavouriteSession(session: Session): Promise<boolean> {
    return this.getFavouriteSessions()
      .then(favouriteSessions => favouriteSessions.indexOf(session.id) !== -1);
  }

  toggleFavouriteSession(sessionId: string): Promise<boolean> {
    return this.getFavouriteSessions().then(favouriteSessions => {
      let index = favouriteSessions.indexOf(sessionId);

      if (index === -1) {
        favouriteSessions.push(sessionId);
        this.storage.set(this.FAVOURITE_SESSION, favouriteSessions);
        return true;
      } else {
        favouriteSessions.splice(index, 1);
        this.storage.set(this.FAVOURITE_SESSION, favouriteSessions);
        return false;
      }
    });
  }
}

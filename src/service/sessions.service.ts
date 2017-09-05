import {Injectable} from "@angular/core";
import {ConferenceDay} from "../data/conferenceday";
import {Http} from "@angular/http";
import {Speaker} from "../data/speaker";
import {Session} from "../data/session";
import {Storage} from "@ionic/storage";
import {Globals} from "./globals.service";
import {CacheService} from "ionic-cache";

@Injectable()
export class SessionService {
  private readonly FAVOURITE_SESSION: string = "favouriteSessionIds";

  constructor(private http: Http, private storage: Storage, private globals: Globals, private cache: CacheService) {
  }

  getFavouriteSessions(): Promise<string[]> {
    return this.storage.get(this.FAVOURITE_SESSION).then(arrayFromStorage => {
      if (arrayFromStorage) {
        return Promise.resolve(arrayFromStorage);
      }

      return Promise.resolve([]);
    });
  }

  getSessions(): Promise<Map<string, ConferenceDay>> {
    return this.cache.loadFromObservable("ehfg-app-sessions", this.http.get(this.globals.baseUrl + "sessions"))
      .map(data => data.json() as Map<string, ConferenceDay>)
      .toPromise()
      .then(data => {
        this.getFavouriteSessions().then(favouriteSessions => {
          Object.keys(data).forEach(key => {
            data[key].sessions.forEach(session => session.favourite = favouriteSessions.indexOf(session.id) !== -1)
          });
        });
        return data;
      });
  }

  getSessionById(id: string): Promise<Session> {
    return this.getSessions().then(days => {
      for (let key of Object.keys(days)) {
        let filteredSessions = days[key].sessions.filter(session => session.id === id);
        if (filteredSessions && filteredSessions.length > 0) {
          return filteredSessions[0];
        }
      }
    });
  }

  getSessionForSpeaker(speaker: Speaker): Promise<Session[]> {
    return this.getSessions().then(sessionMap => {
      let result: Session[] = [];

      Object.keys(sessionMap).forEach(key => {
        sessionMap[key].sessions.forEach(session => {
          if (session.speakers.indexOf(speaker.id) !== -1) {
            result.push(session);
          }
        })
      });

      return result;
    });
  }

  isFavouriteSession(session: Session): Promise<boolean> {
    return this.getFavouriteSessions().then(favouriteSessions => favouriteSessions.indexOf(session.id) !== -1);
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

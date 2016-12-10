import {Injectable} from "@angular/core";
import {ConferenceDay} from "../data/conferenceday";
import {Http} from "@angular/http";
import {Speaker} from "../data/speaker";
import {Session} from "../data/session";

@Injectable()
export class SessionService {
  constructor(private http: Http) { }

  getSessions(): Promise<Map<string, ConferenceDay>> {
    return this.http.get("https://backend-ehfg.rhcloud.com/rest/sessions")
      .toPromise()
      .then(response => response.json() as Map<string, ConferenceDay>);
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
}

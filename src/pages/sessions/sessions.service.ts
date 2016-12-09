import {Injectable} from "@angular/core";
import {ConferenceDay} from "./conferenceday";
import {Http} from "@angular/http";

@Injectable()
export class SessionService {
  constructor(private http: Http) { }

  getSessions(): Promise<Map<String, ConferenceDay>> {
    return this.http.get("https://backend-ehfg.rhcloud.com/rest/sessions")
      .toPromise()
      .then(response => response.json() as Map<String, ConferenceDay>);
  }
}

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SessionsPage } from '../pages/sessions/sessions.component';
import { SpeakersPage } from '../pages/speakers/speakers.component';
import { TwitterPage } from '../pages/twitter/twitter';
import { TabsPage } from '../pages/tabs/tabs';
import {MapPage} from "../pages/map/map";
import {SpeakerService} from "../pages/speakers/speakers.service";
import {HttpModule} from "@angular/http";
import {SpeakerDetailPage} from "../pages/speaker-detail/speaker-detail.component";
import {SessionService} from "../pages/sessions/sessions.service";
import {SessionDetailPage} from "../pages/session-detail/session-detail.component";


@NgModule({
  declarations: [
    MyApp,
    SessionsPage,
    SpeakersPage,
    TwitterPage,
    TabsPage,
    MapPage,
    SpeakerDetailPage,
    SessionDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SessionsPage,
    SpeakersPage,
    TwitterPage,
    TabsPage,
    MapPage,
    SpeakerDetailPage,
    SessionDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SpeakerService, SessionService]
})
export class AppModule {}

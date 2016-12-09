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
import {SpeakerDetail} from "../pages/speaker-detail/speaker-detail";
import {SessionService} from "../pages/sessions/sessions.service";


@NgModule({
  declarations: [
    MyApp,
    SessionsPage,
    SpeakersPage,
    TwitterPage,
    TabsPage,
    MapPage,
    SpeakerDetail
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
    SpeakerDetail
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SpeakerService, SessionService]
})
export class AppModule {}
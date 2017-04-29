import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {SplashScreen} from '@ionic-native/splash-screen';
import {EhfgApp} from "./app.component";
import {SessionsPage} from "../pages/sessions/sessions.component";
import {SpeakersPage} from "../pages/speakers/speakers.component";
import {TwitterPage} from "../pages/twitter/twitter.component";
import {TabsPage} from "../pages/tabs/tabs";
import {MapPage} from "../pages/map/map";
import {SpeakerService} from "../service/speakers.service";
import {HttpModule} from "@angular/http";
import {SpeakerDetailPage} from "../pages/speaker-detail/speaker-detail.component";
import {SessionService} from "../service/sessions.service";
import {SessionDetailPage} from "../pages/session-detail/session-detail.component";
import {TwitterService} from "../service/twitter.service";
import {TwitterTimestampPipe} from "../pages/twitter/twitter.timestamp.pipe";
import {AppNavbarComponent} from "../components/app-navbar/app-navbar";
import {IonicStorageModule, Storage} from "@ionic/storage";
import {TweetComponent} from "../components/tweet/tweet";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    EhfgApp,
    SessionsPage,
    SpeakersPage,
    TwitterPage,
    TabsPage,
    MapPage,
    SpeakerDetailPage,
    SessionDetailPage,
    TwitterTimestampPipe,
    AppNavbarComponent,
    TweetComponent
  ],
  imports: [
    IonicModule.forRoot(EhfgApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    EhfgApp,
    SessionsPage,
    SpeakersPage,
    TwitterPage,
    TabsPage,
    MapPage,
    SpeakerDetailPage,
    SessionDetailPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    SpeakerService, SessionService, TwitterService]
})
export class AppModule {
}

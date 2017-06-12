import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
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
import {TweetComponent} from "../components/tweet/tweet";
import {BrowserModule} from "@angular/platform-browser";
import {SearchPage} from "../pages/search/search";
import {IonicStorageModule} from "@ionic/storage";
import {UtcTimeService} from "../service/time.service";
import {UtcDatePipe} from "../components/utcpipe/utctimestamp.pipe";
import {TrustHtmlPipe} from "../components/sanitizeDom/trusthtml.pipe";
import {Globals} from "../service/globals.service";
import {SpeakerImageComponent} from "../components/speaker-image/speaker-image";


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
    TweetComponent,
    SearchPage,
    UtcDatePipe,
    TrustHtmlPipe,
    AppNavbarComponent,
    SpeakerImageComponent
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
    SessionDetailPage,
    SearchPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SplashScreen,
    SpeakerService, SessionService, TwitterService, UtcTimeService, Globals]
})
export class AppModule {
}

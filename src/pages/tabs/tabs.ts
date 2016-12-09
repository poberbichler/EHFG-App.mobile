import {Component} from '@angular/core';

import {TwitterPage} from '../twitter/twitter';
import {SessionsPage} from '../sessions/sessions.component';
import {SpeakersPage} from '../speakers/speakers.component';
import {MapPage} from "../map/map";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = TwitterPage;
  tab2Root: any = SessionsPage;
  tab3Root: any = SpeakersPage;
  tab4Root: any = MapPage;
}

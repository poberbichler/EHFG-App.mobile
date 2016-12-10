import {Component} from '@angular/core';

import {TwitterPage} from '../twitter/twitter';
import {SessionsPage} from '../sessions/sessions.component';
import {SpeakersPage} from '../speakers/speakers.component';
import {MapPage} from "../map/map";
import {NavParams} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = TwitterPage;
  tab2Root: any = SessionsPage;
  tab3Root: any = SpeakersPage;
  tab4Root: any = MapPage;

  selectedIndex: number;

  constructor(navParams: NavParams) {
    this.selectedIndex = navParams.data || 0;
  }
}

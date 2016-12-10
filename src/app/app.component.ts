import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {TabsPage} from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.template.html'
})
export class EhfgApp {
  rootPage = TabsPage;

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openTab(tabIndex: number): void {
    this.nav.setRoot(TabsPage, tabIndex);
  }
}

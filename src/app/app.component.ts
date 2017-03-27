import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, AlertController} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.template.html'
})
export class EhfgApp {
  rootPage = TabsPage;

  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, private alertCtrl: AlertController, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      //StatusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openTab(tabIndex: number): void {
    this.nav.setRoot(TabsPage, tabIndex);
  }

  openAbout(): void {
    let alert = this.alertCtrl.create({
      title: 'About',
      subTitle: `<p>The European Health Forum Gastein is an annual international conference where stakeholders within
		            the field of healthcare and public health meet to discuss a broad spectrum of important topics.</p>
		            <p>The theme of this year is "Demographics and Diversity in Europe - New Solutions for Health"</p>
		            <p>Please direct any questions or concerns to <a href="mailto:info@ehfg.org">info@ehfg.org</a></p>`,
      buttons: ['Exit']});
    alert.present();
  }

  resetData(): void {
    console.log('reset is not implemented yet');
  }
}

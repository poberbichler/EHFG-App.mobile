import {Component, ViewChild} from "@angular/core";
import {AlertController, Events, Nav, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";

import {TabsPage} from "../pages/tabs/tabs";
import {TwitterService} from "../service/twitter.service";
import {MapPage} from "../pages/map/map";

@Component({
  templateUrl: 'app.template.html'
})
export class EhfgApp {
  rootPage = TabsPage;

  hideRetweets: boolean = true;

  mapCategories = [ {
    name : "Venues",
    cssClass : "",
    imageUrl : "",
    toggled: true
  }, {
    name : "Hotels",
    cssClass : "toggle-assertive",
    imageUrl : "",
    toggled: true
  }, {
    name : "Suggested Restaurants",
    cssClass : "toggle-calm",
    imageUrl : "",
    toggled: true
  } ];

  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
              private alertCtrl: AlertController,
              private splashScreen: SplashScreen,
              private events: Events) {

    platform.ready().then(() => {
      splashScreen.hide();
    });
  }

  showRetweetsChanged(event: boolean) {
    this.hideRetweets = event;
    this.events.publish(TwitterService.SHOW_RETWEETS_TOPIC, event);
  }

  categoryToggleChanged(category) {
    this.events.publish(MapPage.CATEGORY_TOPIC, category);
  }

  get activeIndex(): number {
    let activeNavChild = this.nav.getActiveChildNav();
    if (activeNavChild) {
      if (activeNavChild.getSelected()) {
        return activeNavChild.getSelected().index;
      }
    }

    return;
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

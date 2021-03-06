import {Component, ViewChild} from "@angular/core";
import {AlertController, Events, MenuController, Nav, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";

import {TabsPage} from "../pages/tabs/tabs";
import {TwitterService} from "../service/twitter.service";
import {MapPage} from "../pages/map/map";
import {SearchPage} from "../pages/search/search";
import {Globals} from "../service/globals.service";
import {CacheService} from "ionic-cache";

@Component({
  templateUrl: 'app.template.html'
})
export class EhfgApp {
  rootPage = TabsPage;

  searchTerm: string = "";
  hideRetweets: boolean = true;

  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
              private alertCtrl: AlertController,
              private splashScreen: SplashScreen,
              private events: Events,
              private globals: Globals,
              private menuCtrl: MenuController,
              private cacheService: CacheService) {

    platform.ready().then(() => {
      splashScreen.hide();
    });

    this.cacheService.setDefaultTTL(60 * 60); // 1 hour
  }

  showRetweetsChanged(event: boolean) {
    this.hideRetweets = event;
    this.events.publish(TwitterService.SHOW_RETWEETS_TOPIC, event);
  }

  categoryToggleChanged(category) {
    this.events.publish(MapPage.CATEGORY_TOPIC, category);
  }

  search(event): void {
    this.nav.push(SearchPage, this.searchTerm);
    this.menuCtrl.close();
    this.searchTerm = "";
  }

  get activeIndex(): number {
    let activeNavChild = this.nav.getActiveChildNavs();
    if (activeNavChild[0] && activeNavChild[0].getSelected()) {
      return activeNavChild[0].getSelected().index;
    }

    return 0;
  }

  openTab(tabIndex: number): void {
    this.nav.setRoot(TabsPage, tabIndex);
  }

  openAbout(): void {
    let alert = this.alertCtrl.create({
      title: 'About',
      subTitle: `<p>The European Health Forum Gastein is an annual international conference where stakeholders within
		            the field of healthcare and public health meet to discuss a broad spectrum of important topics.</p>
		            <p>The theme of this year is "Health in All Politics – a better future for Europe"</p>
		            <p>Please direct any questions or concerns to <a href="mailto:info@ehfg.org">info@ehfg.org</a></p>`,
      buttons: ['Exit']
    });
    alert.present();
  }

  resetData(): void {
    this.cacheService.clearAll().then(() => location.reload());
  }

  get mapCategories() {
    return this.globals.mapCategories;
  }
}

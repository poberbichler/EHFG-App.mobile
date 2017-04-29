import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  searchTerm: string;
  searchResult: any;

  constructor(private navParams: NavParams, private http: Http) {
    this.searchTerm = navParams.data;
    this.http.get(`https://backend-ehfg.rhcloud.com/rest/search/${this.searchTerm}`).subscribe(result => {
      this.searchResult = result.json();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {Globals} from "../../service/globals.service";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  searchTerm: string;
  searchResult: any;

  constructor(private navParams: NavParams, private http: Http, private globals: Globals) {
    this.searchTerm = navParams.data;
    this.http.get(this.globals.baseUrl + `search/${this.searchTerm}`).subscribe(result => {
      this.searchResult = result.json();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}

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
  hasAnyResult: boolean = false;

  constructor(private navParams: NavParams, private http: Http, private globals: Globals) {
    this.searchTerm = navParams.data;
    this.http.get(this.globals.baseUrl + `search/${this.searchTerm}`).subscribe(result => {
      this.searchResult = result.json();
      this.hasAnyResult = this.hasAnyTweets(this.searchResult) || this.hasAnyOtherResult(this.searchResult);
    });
  }

  private hasAnyOtherResult(searchResult: any) {
    return searchResult.results.filter(it => it.data.length !== 0).length !== 0;
  }

  private hasAnyTweets(searchResult: any) {
    return searchResult.tweets.length !== 0;
  }
}

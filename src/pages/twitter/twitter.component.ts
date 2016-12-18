import {Component, OnInit} from '@angular/core';

import {TwitterService} from "../../service/twitter.service";
import {LoadingController} from "ionic-angular";

@Component({
  selector: 'page-twitter',
  templateUrl: 'twitter.html'
})
export class TwitterPage implements OnInit {
  tweets: any[];
  tweetData: any;

  constructor(private twitterService: TwitterService, private loadingCtrl: LoadingController) {
  }

  ngOnInit(): void {
    this.twitterService.getTweets().then(tweetData => {
      this.tweets = tweetData.data;
      this.tweetData = tweetData;
    });
  }

  loadNextPage(): void {
    let loading = this.loadingCtrl.create({
      content: 'Loading more Tweets...'
    });

    loading.present();

    this.twitterService.getTweetPage(this.tweetData.currentPage + 1).then(tweetData => {
      this.tweetData = tweetData;
      this.tweets = this.tweets.concat(tweetData.data);
      loading.dismiss();
    });
  }

  updateNewerTweets(refresher): void {
    this.twitterService.updateTweets(this.tweets[0].timestamp).then(newerTweets => {
      this.tweets = newerTweets.concat(this.tweets);
      refresher.complete();
    });
  }

  get hasMoreTweets(): boolean {
    if (this.tweetData) {
      return this.tweetData.morePages;
    }
    return false;
  }

  get currentHashtag(): string {
    if(this.tweetData) {
      return this.tweetData.currentHashtag;
    }

    return "";
  }
}

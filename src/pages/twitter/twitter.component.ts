import {Component, OnInit} from '@angular/core';

import {TwitterService} from "../../service/twitter.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'page-twitter',
  templateUrl: 'twitter.html'
})
export class TwitterPage implements OnInit {
  tweets: any[];
  tweetData: any;

  constructor(private twitterService: TwitterService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.twitterService.getTweets().then(tweetData => {
      this.tweets = tweetData.data;
      this.tweetData = tweetData;
    });
  }

  loadNextPage(): void {
    this.twitterService.getTweetPage(this.tweetData.currentPage + 1).then(tweetData => {
      this.tweetData = tweetData;
      this.tweets = this.tweets.concat(tweetData.data);
    });
  }

  get hasMoreTweets() {
    if (this.tweetData) {
      return this.tweetData.morePages;
    }
    return false;
  }
}

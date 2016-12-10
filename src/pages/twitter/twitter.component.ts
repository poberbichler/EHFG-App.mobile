import {Component, OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';
import {TwitterService} from "../../service/twitter.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'page-twitter',
  templateUrl: 'twitter.html'
})
export class TwitterPage implements OnInit {
  tweets: any[];
  constructor(private twitterService: TwitterService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.twitterService.getTweets().then(tweetData => {
      console.log(tweetData);
      this.tweets = tweetData.data;
    });
  }
}

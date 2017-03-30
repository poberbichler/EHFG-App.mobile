import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: 'tweet.html'
})
export class TweetComponent {
  @Input()
  tweet: any;

  @Input()
  hideRetweets: boolean;
}

import {Component, Input, OnInit} from '@angular/core';
import {Speaker} from "../../data/speaker";

@Component({
  selector: 'speaker-image',
  templateUrl: 'speaker-image.html'
})
export class SpeakerImageComponent implements OnInit {

  @Input()
  speaker: Speaker;

  imageUrl: string;

  ngOnInit(): void {
    this.imageUrl = this.extractLocalUrlFromSpeaker(this.speaker);
  }

  private extractLocalUrlFromSpeaker(speaker: Speaker): string {
    return "assets/img/speakers/" + this.speaker.imageUrl.split("/").pop();
  }

  updateUrl(errorEvent: any ) {
    if (this.imageUrl === this.extractLocalUrlFromSpeaker(this.speaker)) {
      this.imageUrl = this.speaker.imageUrl;
    } else {
      this.imageUrl = "assets/img/speakers/speakersdefaultperson.jpg";
    }
  }
}

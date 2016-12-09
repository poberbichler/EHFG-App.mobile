import {NavParams} from "ionic-angular";
import {Speaker} from "../speakers/speaker";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'speaker-detail.html',
  selector: 'page-speaker-detail'
})
export class SpeakerDetailPage {
  speaker: Speaker;

  constructor(public params: NavParams) {
    this.speaker = params.data;
  }
}

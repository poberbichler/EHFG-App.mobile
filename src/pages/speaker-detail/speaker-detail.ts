import {NavController, NavParams, ViewController} from "ionic-angular";
import {SpeakerService} from "../speakers/speakers.service";
import {Speaker} from "../speakers/speaker";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'speaker-detail.html',
  selector: 'page-speaker-detail'
})
export class SpeakerDetail {
  speaker: Speaker;

  constructor(public params: NavParams) {
    this.speaker = params.data;
  }
}

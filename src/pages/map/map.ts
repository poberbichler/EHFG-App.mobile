import {Component, ViewChild, ElementRef} from "@angular/core";
import {Platform} from "ionic-angular";

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(private platform: Platform) { }

  ionViewDidLoad(): void {
    if (this.platform.is('cordova') === true) {
      console.log("native map not implemented yet :(");
    } else {
      let mapEle = this.mapElement.nativeElement;

      let map = new google.maps.Map(mapEle, {
        center: {lat: 47.170329, lng: 13.103852},
        zoom: 16
      });
    }
  }
}

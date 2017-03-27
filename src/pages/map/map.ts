import {Component, ViewChild, ElementRef} from "@angular/core";
import {Platform} from "ionic-angular";
import {GoogleMap} from "@ionic-native/google-maps";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('mapCanvas') mapElement: ElementRef;

  public map: GoogleMap;

  constructor(private platform: Platform, private http: Http) { }

  ionViewDidLoad(): void {
    console.log(this.platform);
    if (this.platform.is('cordova') === true) {
      console.log('hm...')
      /*
      let mapEle = this.mapElement.nativeElement;
      this.map = new GoogleMap('map_canvas');
      mapEle.classList.add('show-map');

      GoogleMap.isAvailable().then(() => {
        console.log('hmm2...')
        this.map.moveCamera({
          target: new GoogleMaps(47.170329, 13.103852),
          zoom: 16
        });
      });
      */
    } else {
      console.log('not cordova, using browser based googleMap');
      let mapEle = this.mapElement.nativeElement;

      let map = new google.maps.Map(mapEle, {
        center: {lat: 47.170329, lng: 13.103852},
        zoom: 16
      });

      this.http.get(`https://backend-ehfg.rhcloud.com/rest/points`).subscribe(data => {
        data.json().forEach(point => {
          console.log(point);

          let marker = new google.maps.Marker({
            position: {lat: point.coordinate.latitude, lng: point.coordinate.longitude},
            map: map,
            icon: `assets/img/markers/${point.category.cssClass ? point.category.cssClass + '-' : ''}marker.png`
          });

          marker.addListener('click', () => {
            let infoWindow = new google.maps.InfoWindow({
              content: `<p>${point.description}</p>`
            });

            infoWindow.open(map, marker);
          });
        });
      });
    }
  }
}

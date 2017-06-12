import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import {Events, Platform} from "ionic-angular";
import {GoogleMap} from "@ionic-native/google-maps";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {Globals} from "../../service/globals.service";

declare const google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit {
  public static readonly CATEGORY_TOPIC = "ehfg-app-categoryChanged";

  @ViewChild('mapCanvas') mapElement: ElementRef;

  public map: GoogleMap;
  private markers: any =  [];

  constructor(private platform: Platform, private http: Http, private events: Events, private globals: Globals) { }

  ngOnInit(): void {
    this.events.subscribe(MapPage.CATEGORY_TOPIC, category => {
      this.markers.filter(marker => marker.category === category.name).forEach(marker => {
        marker.setVisible(category.toggled);
      });
    });
  }

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

      this.http.get(this.globals.baseUrl + "points").subscribe(data => {
        data.json().forEach(point => {
          let marker = new google.maps.Marker({
            position: {lat: point.coordinate.latitude, lng: point.coordinate.longitude},
            map: map,
            icon: `assets/img/markers/${point.category.cssClass ? point.category.cssClass + '-' : ''}marker.png`,
            category: point.category.name
          });

          marker.addListener('click', () => {
            let infoWindow = new google.maps.InfoWindow({
              content: `<p>${point.description}</p>`
            });

            infoWindow.open(map, marker);
          });

          this.markers.push(marker);
        });
      });
    }
  }
}

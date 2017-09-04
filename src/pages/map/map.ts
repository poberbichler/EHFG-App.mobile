import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import {Events, Platform} from "ionic-angular";
import {GoogleMap, GoogleMaps, LatLng} from "@ionic-native/google-maps";
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

  @ViewChild('map') mapElement: ElementRef;

  public map: GoogleMap;
  private markers: any =  [];

  constructor(private platform: Platform, private http: Http, private events: Events, private globals: Globals,
              private googleMaps: GoogleMaps) {
  }

  ngOnInit(): void {
    this.events.subscribe(MapPage.CATEGORY_TOPIC, category => {
      this.markers.filter(marker => marker.get('category') === category.name).forEach(marker => {
        marker.setVisible(category.toggled);
      });
    });
  }

  ionViewDidLoad(): void {
    console.log(this.platform);
    if (this.platform.is('cordova') === true) {
      this.platform.ready().then(() => {
        let niceMap = new GoogleMap('map', {
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': new LatLng(47.170329, 13.103852),
            'zoom': 16
          }
        });

        this.http.get(this.globals.baseUrl + "points").subscribe(data => {
          data.json().forEach(point => {
            niceMap.addMarker({
              icon: `assets/img/markers/${point.category.cssClass ? point.category.cssClass + '-' : ''}marker.png`,
              position: new LatLng(point.coordinate.latitude, point.coordinate.longitude),
              title: point.title,
              snippet: point.text
            }).then(marker => {
              marker.set('category', point.category.name);
              this.markers.push(marker);
            });
          });
        });
      });
    } else {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
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

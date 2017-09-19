import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Events, MenuController, Platform} from "ionic-angular";
import {GoogleMaps, LatLng} from "@ionic-native/google-maps";
import {Http} from "@angular/http";

import {Globals} from "../../service/globals.service";

declare const google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit {
  public static readonly CATEGORY_TOPIC = "ehfg-app-categoryChanged";

  @ViewChild('map') mapElement: ElementRef;

  private markers: any =  [];

  constructor(private platform: Platform,
              private http: Http,
              private events: Events,
              private globals: Globals,
              private googleMaps: GoogleMaps,
              private menuCtrl: MenuController) {
  }

  ngOnInit(): void {
    this.events.subscribe(MapPage.CATEGORY_TOPIC, category => {
      this.markers.filter(marker => marker.get('category') === category.name).forEach(marker => {
        marker.setVisible(category.toggled);
      });
    });
  }

  ionViewDidLoad(): void {
    if (this.isNative()) {
      this.platform.ready().then(() => {
        let map = this.createNativeMap();
        this.http.get(this.globals.baseUrl + "points").subscribe(data => this.createNativeMarker(data, map));
        this.workaroundSideMenu(map);
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

  private createNativeMap() {
    return this.googleMaps.create(this.mapElement.nativeElement, {
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
  }

  private workaroundSideMenu(map: any) {
    let leftMenu = this.menuCtrl.get('left');
    if (leftMenu && this.isNative()) {
      leftMenu.ionOpen.subscribe(() => map.setClickable(false));
      leftMenu.ionClose.subscribe(() => map.setClickable(true));
    }
  }

  private createNativeMarker(input: any, map: any) {
    input.json().forEach(point => {
      map.addMarker({
        icon: `assets/img/markers/${point.category.cssClass ? point.category.cssClass + '-' : ''}marker.png`,
        position: new LatLng(point.coordinate.latitude, point.coordinate.longitude),
        title: point.name,
        snippet: point.descriptionNative
      }).then(marker => {
        marker.set('category', point.category.name);
        this.markers.push(marker);
      });
    });
  }

  private isNative() {
    return this.platform.is('cordova') === true;
  }
}

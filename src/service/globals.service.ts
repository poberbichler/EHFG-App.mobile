import {Injectable} from "@angular/core";

@Injectable()
export class Globals {
  mapCategories = [{
    name: "Venues",
    cssClass: "",
    imageUrl: "",
    toggled: true
  }, {
    name: "Hotels",
    cssClass: "toggle-assertive",
    imageUrl: "",
    toggled: true
  }, {
    name: "Suggested Restaurants",
    cssClass: "toggle-calm",
    imageUrl: "",
    toggled: true
  }];

  //baseUrl = "https://backend-ehfg.rhcloud.com/rest/";
  baseUrl = "http://localhost:8082/";
}

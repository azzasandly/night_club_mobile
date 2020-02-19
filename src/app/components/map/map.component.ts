import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, icon } from 'leaflet';
import { NavParams } from '@ionic/angular';
declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  {


 /* @ViewChild('map', {static: true}) mapElement: ElementRef;*/
  map: Map;
  latitude;
  longitude;
  location_name;
  
  constructor(
    private navParams: NavParams,
  ) { }
  ionViewWillEnter() {
        //Get data from popover page
        this.latitude = this.navParams.get('latitude');
        this.longitude = this.navParams.get('longitude');
        this.location_name = this.navParams.get('locationName');
        console.log('lati ', this.latitude);
  }
  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {


    this.map = new Map('mapId').setView([this.latitude, this.longitude], 13);

    tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {

      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiYXp6YXNhbmRseSIsImEiOiJjazZrbWs1cXIwNWZsM2ZucGFybDF5Mzh3In0.DTkVYwlYB-77gCosSA1qwA'
  }).addTo(this.map);

    const markPoint = marker([36.924467, 10.285800]);
    markPoint.bindPopup('<b>'+this.location_name+'</b>');
    this.map.addLayer(markPoint);
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

}

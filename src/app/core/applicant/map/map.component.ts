import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  map: L.Map
  theMarker: L.Marker
  markerCoordinates
  markedLocation

  options = {
    layers: [
      L.tileLayer(
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', 
        { 
          maxZoom: 20,
          subdomains:['mt0','mt1','mt2','mt3']
        }
      )
    ],
    zoom: 12,
    center: L.latLng(3.1279, 101.5945)
  };

  constructor(
    public geoLocation: Geolocation
  ) { }

  ngOnInit() {}

  onMapReady(map: L.Map) {

    console.log('map is ready')

    setTimeout(() => {
      map.invalidateSize();
    }, 0)

    this.geoLocation.getCurrentPosition().then((resp) => {
      console.log('geoloc: ', resp.coords)
      this.markerCoordinates = resp.coords
    }).catch((error) => {
      console.log('geoloc: ', error)
    })

    map.on('click', <LeafletMouseEvent>(e) => { 
      console.log(e.latlng) 
      this.markerCoordinates = e.latlng
      console.log(this.markerCoordinates)
      if (this.theMarker != undefined){
        map.removeLayer(this.theMarker)
      }
      this.theMarker = new L.Marker(e.latlng, {
        icon: L.icon({
          iconSize: [ 30, 30 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/icon/location-pin.svg'
        }
      )}).addTo(map)
    });
  }
}

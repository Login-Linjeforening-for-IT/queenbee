import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private currentMarker: L.Marker | null = null;
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "./assets/img/marker-icon.png",
      shadowUrl: "./assets/img/marker-shadow.png"
    })
  };

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 60.79039181292657, 10.683486407725253 ], // Coords of a special room
      zoom: 13
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    
    this.map.on("click", (e: { latlng: { lat: number; lng: number; }; }) => {
      console.log(e.latlng);

      if(this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }

      this.currentMarker = L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.map); 
    });
  }
  
  constructor() { }

  ngAfterViewInit(): void { 
    this.initMap();
  }
}
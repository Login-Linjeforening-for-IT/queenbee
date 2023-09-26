import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Output() coords = new EventEmitter<{lat: string, long: string}>();
  isSatelliteView: boolean = false;
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
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const osmHot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
    });


    const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    this.map = L.map('map', {
      center: [ 60.79039181292657, 10.683486407725253 ], // Coords of a special room ;)
      zoom: 13,
      layers: [osm]
    });

    const baseMaps = {
      "OpenStreetMap": osm,
      "OpenStreetMap.HOT": osmHot,
      "ESRI Sattelite": esriSat
    };

    L.control.layers(baseMaps).addTo(this.map);

    this.map.on("click", (e: { latlng: { lat: number; lng: number; }; }) => {
      this.coords.emit({lat: '' + e.latlng.lat, long: '' + e.latlng.lng})

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

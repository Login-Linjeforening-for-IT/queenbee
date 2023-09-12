import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-mazemap',
  templateUrl: './mazemap.component.html',
  styleUrls: ['./mazemap.component.css']
})
export class MazemapComponent implements AfterViewInit {
  private initMap(): void {
    const mapContainer = document.getElementById('mazemap'); // Get the map container element
    const mapOptions = {
      container: mapContainer, // Use the map container as the container for the map
      center: { lat: 60.79004952939053, lng: 10.683486407725253 }, // Coordinates centered between Kobolt, Ametyst and Gneis
      zoom: 17,
      zLevel: 1
    };

    const map = new (window as any).Mazemap.Map(mapOptions);

    // Set the map's size to match the container
    map.resize();

    // Add zoom and rotation controls to the map.
    map.addControl(new (window as any).Mazemap.mapboxgl.NavigationControl());
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}

import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-mazemap',
  templateUrl: './mazemap.component.html',
  styleUrls: ['./mazemap.component.css']
})

/**
 * The 'MazemapComponent' is used for displaying MazeMap map of campuses.
 */
export class MazemapComponent implements AfterViewInit {
  private initMap(): void {
    const mapContainer = document.getElementById('mazemap'); // Get the map container element
    const mapOptions = {
      container: mapContainer, // Use the map container as the container for the map
      center: { lat: 60.79004952939053, lng: 10.683486407725253 }, // Coordinates centered (roughly) between Kobolt, Ametyst and Gneis
      zoom: 19,
      zLevel: 1,
      pitch: 56.8,
      bearing: 10,
      threeD: { animateWalls: true, show3dAssets: true },
    };

    const map = new (window as any).Mazemap.Map(mapOptions);

    // Set the map's size to match the container
    map.resize();
    map.enable3d();

    // Add zoom and rotation controls to the map.
    map.addControl(new (window as any).Mazemap.mapboxgl.NavigationControl());
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}

import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';

declare var H: any;

@Component({
  selector: 'here-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class HereMapComponent implements OnInit, AfterViewInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  private _apikey: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  public constructor() { }

  public ngOnInit() { }

  public ngAfterViewInit() {
    let platform = new H.service.Platform({
      "apikey": this._apikey
    });
    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1,
        center: { lat: this.lat, lng: this.lng }
      }
    );

    window.addEventListener('resize', () => map.getViewPort().resize());

    let ui = H.ui.UI.createDefault(map, defaultLayers);
    let marker = new H.map.Marker({lat: this.lat, lng: this.lng});
    map.addObject(marker);
  }

}

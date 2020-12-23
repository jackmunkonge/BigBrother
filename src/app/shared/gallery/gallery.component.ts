import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../demo/service/photoservice';
import { Image } from '../../demo/domain/image';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  images: Image[];

  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  activeIndex: number = 0;
  display: boolean;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getImages().then(images =>{
      this.images = images
    })
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.display = true;
  }
}

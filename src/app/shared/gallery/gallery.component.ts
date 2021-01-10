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

  months = ['January', 'February', 'March', 'April', 'May' ,'June', 'July', 'August',
  'September', 'October', 'November', 'December'];

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getImages().then(images =>{
      this.images = images.sort((a,b) => a.dateCreated.getDate() > b.dateCreated.getDate() ? 1 : -1);
    })
  }

  getImagesByMonth(month: number) {
    return this.images.filter(image => image.dateCreated.getMonth() === month)
      .sort((a,b) => a.dateCreated.getDate() > b.dateCreated.getDate() ? 1 : -1);
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.display = true;
  }
}

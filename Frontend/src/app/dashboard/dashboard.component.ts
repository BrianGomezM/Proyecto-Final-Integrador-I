import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  images = [
    {
      src: 'https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/1.webp',
      caption: 'Table Full of Spices',
      thumb: 'https://mdbcdn.b-cdn.net/img/Photos/Slides/1.webp'
    },
    {
      src: 'https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Square/1.webp',
      caption: 'Coconut with Strawberries',
      thumb: 'https://mdbcdn.b-cdn.net/img/Photos/Square/1.webp'
    },
    {
      src: 'https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Vertical/1.webp',
      caption: 'Dark Roast Iced Coffee',
      thumb: 'https://mdbcdn.b-cdn.net/img/Photos/Vertical/1.webp'
    }
  ];

  constructor(private lightbox: Lightbox) {}

  ngOnInit() {}

  openLightbox(index: number): void {
    this.lightbox.open(this.images, index);
  }
}

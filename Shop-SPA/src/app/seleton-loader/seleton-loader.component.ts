import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seleton-loader',
  templateUrl: './seleton-loader.component.html',
  styleUrls: ['./seleton-loader.component.scss']
})
export class SeletonLoaderComponent implements OnInit {

  @Input() Cwidth;
  @Input() Cheight;
  @Input() circle: boolean;

  constructor() { }

  ngOnInit() {
  }

  getMyStyles() {
    const myStyles = {
        'width.px': this.Cwidth ? this.Cwidth : '',
        'height.px': this.Cheight ? this.Cheight : '',
        'border-radius': this.circle ? '50%' : ''
    };
    return myStyles;
}

}

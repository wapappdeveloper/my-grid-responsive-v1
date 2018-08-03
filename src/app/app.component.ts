import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  heading: string = 'heading';
  content: string = 'content';
  detail: string = 'detail';

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.loadJSON('assets/data/assets.json', (res) => {
      if (res) {
        res.map((elm, index) => {
          this.commonService.loadAsset(elm);
        });
      }
    });
  }

  /**
   * For testing purpose
   */
  emitter() {
    console.log('emitter fired');
  }
}

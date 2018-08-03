import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Data } from '../services/data.model';
import { Router } from '@angular/router';
import { DatapersistanceService } from '../services/datapersistance.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild('container') private container: ElementRef;
  list: Data[] = [];
  jsonPath: string = 'assets/data/data.json';
  tileWidth: number = 300;
  tileHeight: number = 190;
  tileMargin: number = 10;
  tileBorder: number = 1;
  listWidth: number = 300;

  infoHeading: string = '';
  infoContent: string = '';

  infoPopup: boolean = false;

  likeData: Array<number> = null;
  likeDataId:string = 'starLikes';

  asyncEventHolder: any = null;

  editMode:boolean = false;

  constructor(private commonService: CommonService, private router: Router, private dataPersistance: DatapersistanceService) {

  }

  ngOnInit() {
    this.commonService.listLanded = true;
    this.likeData = this.dataPersistance.getData(this.likeDataId);
    if (this.commonService.data) {
      this.list = this.commonService.data;
    } else {
      this.commonService.loadJSON(this.jsonPath, (res) => {
        this.jsonLoaded(res);
      }, (err) => {
        this.jsonFailedToLoad(err);
      });
    }
    this.resize();
    this.commonService.newUpdate.subscribe((data)=>{
      this.editMode = data;
    });
  }

  getMatchWidth(containerWidth: number, tileWidth: number) {
    var newListWidth: number = (tileWidth + (2 * this.tileMargin) + (2 * this.tileBorder));
    var inc: number = 0;
    var adjInc: number = 2;
    while (tileWidth > 0) {
      inc++;
      newListWidth = (tileWidth + (2 * this.tileMargin) + (2 * this.tileBorder)) * inc + adjInc;
      //console.log(newListWidth, containerWidth);
      if (newListWidth > (containerWidth - adjInc * 2)) {
        //console.log(newListWidth, containerWidth);
        newListWidth = newListWidth - (tileWidth + (2 * this.tileMargin) + (2 * this.tileBorder));
        if (newListWidth < (tileWidth + (2 * this.tileMargin) + (2 * this.tileBorder))) {
          newListWidth = (tileWidth + (2 * this.tileMargin) + (2 * this.tileBorder));
        }
        return newListWidth;
      }
    }
    return newListWidth;
  }

  jsonLoaded(res) {
    this.list = this.commonService.data = res;
    if (this.likeData) {
      this.likeData.map((elm, index) => {
        this.list[index].hilight = elm;
      });
    } else {
      this.likeData = [];
      this.list.map((elm, index) => {
        this.likeData[index] = elm.hilight;
      });
      this.dataPersistance.setData(this.likeDataId, this.likeData);
    }
    this.resize();
  }

  jsonFailedToLoad(err) {
    console.error(err);
  }

  resize() {
    this.listWidth = this.getMatchWidth(this.container.nativeElement.offsetWidth, this.tileWidth);
  }

  hilightOrDehilightMe(event: Event, item: any, index: number) {
    clearTimeout(this.asyncEventHolder);
    this.asyncEventHolder = setTimeout(() => {
      if (event && event.type === 'dblclick') {
        item.hilight = 2;
        this.likeData[index] = item.hilight;
        this.dataPersistance.setData(this.likeDataId, this.likeData);
      } else {
        (item.hilight == 0) ? item.hilight = 1 : item.hilight = 0;
        this.likeData[index] = item.hilight;
        this.dataPersistance.setData(this.likeDataId, this.likeData);
      }
    }, 200);

  }

  showInfo(heading: string, info: string) {
    this.infoHeading = heading;
    this.infoContent = info;
    this.infoPopup = true;
  }

  navigateToDetail(heading: string, detail: string) {
    //this.router.navigate(['detail', { heading: heading, detail: detail }], { skipLocationChange: true });
    this.commonService.detailPageData = { heading: heading, detail: detail };
    this.router.navigateByUrl('detail');
  }

  emitter() {
    this.infoHeading = '';
    this.infoContent = '';
    this.infoPopup = false;
  }

  emitterValues(obj:any){
    this.tileWidth = obj.width;
    this.tileHeight = obj.height;
    this.tileMargin = obj.margin;
    this.resize();
  }

}

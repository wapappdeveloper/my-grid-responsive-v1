import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DatapersistanceService } from '../services/datapersistance.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  @Output('emitter') private emitter: EventEmitter<any> = new EventEmitter();
  @Input('editMode') editMode;
  width: number = 300;
  height: number = 190;
  margin: number = 10;
  editStarted:boolean = false;
  tileDataId:string = 'tileData';
  tileData:any = null;
  constructor(private dataPersistance:DatapersistanceService, private commonService:CommonService) { }

  ngOnInit() {
    this.tileData = this.dataPersistance.getData(this.tileDataId);
    if(this.tileData){
      this.commonService.tileData = this.tileData;
    }else{
      this.tileData = this.commonService.tileData;
      this.dataPersistance.setData(this.tileDataId, this.tileData);
    }
    this.width = Number(this.tileData.width);
    this.height = Number(this.tileData.height);
    this.margin = Number(this.tileData.margin);
    this.emitter.emit(this.tileData);
  }

  ngOnChanges(){
    (this.editMode)?this.editStarted = true:'';
  }

  updateValues() {
    this.width = Number(this.width);
    this.height = Number(this.height);
    this.margin = Number(this.margin);
    this.tileData = this.commonService.tileData = { width: this.width, height: this.height, margin: this.margin };
    this.emitter.emit(this.tileData);
  }

  storeValues(){
    this.dataPersistance.setData(this.tileDataId, this.tileData);
  }

}

import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  editMode:boolean = false;
  constructor(private commonService:CommonService) { }

  ngOnInit() {
  }

  editOpenClose(){
    this.editMode = !this.editMode;
    this.commonService.change(this.editMode);
  }

}

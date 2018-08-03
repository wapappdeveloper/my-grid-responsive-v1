import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  heading:string = '';
  detail:string = '';

  constructor(private route: ActivatedRoute, private router:Router, private commonService:CommonService) { }

  ngOnInit() {
    /*this.route.params.subscribe(param => {
      //console.log(param);
      this.heading = param.heading;
      this.detail = param.detail;
    });*/
    if(!this.commonService.listLanded){
      this.router.navigateByUrl('list');
    }
    this.heading = this.commonService.detailPageData.heading;
    this.detail = this.commonService.detailPageData.detail;
  }

  backToList() {
    this.router.navigateByUrl('list');
  }

}

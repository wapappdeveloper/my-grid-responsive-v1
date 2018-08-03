import { Component, OnInit } from '@angular/core';
import { DatapersistanceService } from '../services/datapersistance.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  likeDataId:string = 'starLikes';
  constructor(private dataPersistance:DatapersistanceService) { }

  ngOnInit() {
  }
  eraceData(){
    this.dataPersistance.delete(this.likeDataId);
  }

}

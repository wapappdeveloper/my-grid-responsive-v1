import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() heading:string;
  @Input() content:string;
  @Output() emitter:EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  closeInfo(){
    this.emitter.emit('');
  }

}

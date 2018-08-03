import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Data } from './data.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommonService {
  data: Data[] = null;
  detailPageData: {
    heading: string,
    detail: string
  } = { heading: '', detail: '' };
  tileData:{
    width:number,
    height:number,
    margin:number
  } = {
    width:300,
    height:190,
    margin:10
  }
  listLanded:boolean = false;
  constructor(private httpClient: HttpClient) { }
  loadJSON(path: string, success: Function, fail?: Function) {
    this.getJSON(path).subscribe((res) => {
      success.call(this, res);
    }, (err) => {
      if (fail) {
        fail.call(this, err);
      } else {
        console.error(err);
      }
    });
  }

  private getJSON(path: string): Observable<any> {
    return this.httpClient.get(path);
  }

  loadAsset(assetName): Promise<any> {
    return this.httpClient.get('/assets/pngs/' + assetName, { responseType: "blob" }).toPromise();
  }

  /**Communicate between components*/
  private update:any = new BehaviorSubject(false);
  newUpdate = this.update.asObservable();
  change(data?:any) {
    this.update.next(data);
  }


}

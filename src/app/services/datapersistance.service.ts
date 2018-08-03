import { Injectable } from '@angular/core';

@Injectable()
export class DatapersistanceService {
  constructor() { }

  setData(id:string, data:any) {
    if (window.localStorage) {
      localStorage.setItem(id, JSON.stringify(data));
    }else{
      console.error('This Browser not support web-storage');
    }
  }

  getData(id:string) {
    if (window.localStorage) {
      if(String(localStorage.getItem(id))==='null' || String(localStorage.getItem(id))==='undefined'){
        return null;
      }else{
        return JSON.parse(localStorage.getItem(id));
      }
    }else{
      console.error('This Browser not support web-storage');
      return null;
    }
  }

  delete(id:string){
    if (window.localStorage) {
      localStorage.removeItem(id);
    }else{
      console.error('This Browser not support web-storage');
    }
  }

}

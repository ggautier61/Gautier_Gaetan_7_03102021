import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  postNews(): Promise<boolean> {
    return new Promise(resolve => {
      return true;
    });
  }
}

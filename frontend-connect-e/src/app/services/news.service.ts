import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from "../models/news.model"

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  //Define API
  apiURL = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  postNews(news: any, file: File): Promise<any> {
    // return new Promise(resolve => {
    //   console.log('news', news);
    //   console.log('file', file);
    //   return true;
    // });
    
      const formData = new FormData();
      formData.append('userId', news.userId);
      formData.append('message', news.message);
      if(file) {
        console.log('file');
        (file) &&  formData.append('file', file, file.name);
      }
      
      return new Promise<any>((resolve, reject) => {
        this.http.post(this.apiURL + 'create-news', formData)
        .subscribe(data => {
          return resolve(data);
        })
      })
    
    

    // return this.http.post(this.apiURL + 'user/' + id);
  }

  getAllNews(): Observable<any> {

    return this.http.get(this.apiURL + 'getAllNews');
  }
}

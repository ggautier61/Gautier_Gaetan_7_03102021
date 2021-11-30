import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from "../models/news.model"
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  //Define API
  apiURL = "http://localhost:3000/api/";

  constructor(private http: HttpClient,
              private _handler: HandlerErrorService) { }

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

  postNewsComment(comment: any): Promise<any> {


    return new Promise<any>((resolve, reject) => {
      this.http.post(this.apiURL + 'comment', comment).subscribe((comment: any) => {
        return resolve(comment);
      },
      (error) => { this._handler.handleError; reject(error);});
    });

    
}

  getAllNews(): Observable<any> {

    return this.http.get(this.apiURL + 'getAllNews');
  }
}

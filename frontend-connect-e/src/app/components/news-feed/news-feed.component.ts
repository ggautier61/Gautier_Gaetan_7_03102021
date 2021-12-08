import { TypeofExpr } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { News } from 'src/app/models/news.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
import { NewsService } from 'src/app/services/news.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  @ViewChild('imageInput')
  imageInput: ElementRef | any;
  newsList: Array<News> = [];
  
  userConnected: User | any;

  NewsFeedForm: FormGroup | any;
  SendNewsForm: FormGroup | any;

  imagePreview: string = '';

  uploadFile: File | any;
  isAdmin: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private _tokenStorageService: TokenStorageService,
    private _authService: AuthService,
    private _userService: UserService,
    private _newsService: NewsService,
    private _handler: HandlerErrorService) {

    this._userService.connectedUser$.subscribe(user => {
      user.roles.forEach(role => {

        if (role.name == 'admin') {
          this._userService.isAdmin$.next(true);
        } else {
          this._userService.isAdmin$.next(false);
        }

      });
    });

    this._userService.isAdmin$.subscribe(admin => {
      this.isAdmin = admin;
    });

    this._newsService.getAllNews().subscribe((newslist) => {

      console.log('newslist', newslist);
      this.newsList = newslist;
    });


  }

  ngOnInit(): void {

    if (this._tokenStorageService.getToken()) {
      this._authService.isAuth$.next(true);
      this._userService.getUser(this._tokenStorageService.getUserId()).subscribe(user => {
        this.userConnected = this._userService.transformUser(user);
      });
    }

    this.NewsFeedForm = this.formBuilder.group({
      answerNewsInput: ['']
    });

    this.SendNewsForm = this.formBuilder.group({
      sendFeedInput: [''],
      sendFeedFile: [null]
    });
  }

  Send() {

    const news = {
      userId: this.userConnected.id,
      message: this.SendNewsForm.get('sendFeedInput').value
    }

    this._newsService.postNews(news, this.uploadFile).then(data => {
      if (data) {
        this._newsService.getAllNews().subscribe((newslist) => {
          this.newsList = newslist;
          this.SendNewsForm.get('sendFeedInput').setValue('');
          this.SendNewsForm.get('sendFeedFile').setValue(null);
          this.uploadFile = null;
          this.imagePreview = '';
        });
      }
    },
      (error) => this._handler.handleError(error)
    )

  }

  SendAnswer(event: Event) {

    const target = event.target as HTMLElement;

    if (target.id.includes('btnAnswerNews') || target.id.includes('iconBtnAnswerNews')) {

      const newsId = target.id.split('_')[1];

      const comment = {
        message: this.NewsFeedForm.get('answerNewsInput').value,
        newsId: newsId,
        userId: this.userConnected.id
      }

      this._newsService.postNewsComment(comment).then(() => {
        this._newsService.getAllNews().subscribe((newslist) => {
          this.newsList = newslist;
          this.NewsFeedForm.get('answerNewsInput').setValue('');
        });
      },
        (error) => this._handler.handleError(error)
      )
    }
  }

  onFileAdded(e: FileList) {

    const file: File = e[0];

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
    this.uploadFile = file;

  }

  selectFile(): void {
    this.imageInput.nativeElement.click();
  }

  deleteComment(idcomment: string) {

    this._newsService.deleteComment(idcomment).subscribe((response) => {
      console.log(response);
      if (response == true) {
        this._newsService.getAllNews().subscribe((newslist) => {
          this.newsList = newslist;
        });
      }
    },
      (error) => {
        this._handler.handleError(error);
      })

  }

  deleteNews(idnews: string) {
    this._newsService.deleteNews(idnews).subscribe((response: any) => {
      console.log(response.message);
      if (response.deleted == true) {
        this._newsService.getAllNews().subscribe((newslist) => {
          this.newsList = newslist;
        });
      }
    })
  }

  onLike(idnews: string) {



      // this._newsService.likeNews(idnews).subscribe((result) => {
      //   console.log(result);
      // })  

  }

}

import { TypeofExpr } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
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

  newsList = [
    {
      id: 1, //*
      // le User est a charger pour avoir les données de celui aui a créer la news
      user: {
        id: 2,
        lastname: 'Gautier',
        firstname: 'Gaetan',
        imageURL: 'http://localhost:3000/images/1636693513183_Profil_1.jpg'
      },
      message: 'Super vacances en famille au bord de la mer !', //*
      imageURL: '../../../assets/images/plage.jpg', //*
      ownUserId: 2, //*
      //autre table dépendante
      comment: [{
        id: 1, //*
        newsId: 1, //*
        // Le Owner est a charger pour avoir les données
        owner: {
          id: 12,
          lastname: 'Cussonnet',
          firstname: 'Simon',
          imageURL: 'http://localhost:3000/images/1636416435638_Profil_5.jpg'
        },
        onwerId: 12,  //*
        message: 'Super! c\'est où ?'  //*
      },
      {
        id: 2,
        newid: 1,
        owner: {
          id: 13,
          lastname: 'Honnete',
          firstname: 'Camille',
          imageURL: 'http://localhost:3000/images/1636416531794_Profil_4.jpg'
        },
        message: 'Trop beau! j\'espère que vous avez passez de bonnes vacances. Parer pour reprendre le travail ?'
      }]
    },
    {
      id: 2,
      user: {
        id: 12,
        lastname: 'Magnes',
        firstname: 'Charles',
        imageURL: 'http://localhost:3000/images/1636416499662_Profil_2.jpg'
      },
      message: 'Petit sejour à la montagne. Randonnnées de rigueur :)',
      imageURL: '../../../assets/images/montagne.jpg',
      ownUserId: 12,
      comment: []
    }
  ]

  userConnected: User | any;

  NewsFeedForm: FormGroup | any;
  SendNewsForm: FormGroup | any;

  imagePreview: string = '';
  
  

  
  
  constructor(private formBuilder: FormBuilder,
              private _tokenStorageService: TokenStorageService,
              private _authService: AuthService,
              private _userService: UserService,
              private _newsService: NewsService) { 

    
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
      newsFeedInput: ['']
    });
  }

  Send() {

    this._newsService.postNews().then(data => {
      //if data is true reload de liste of news


    })
  }

  onFileAdded(e: FileList) {

    const file: File = e[0];
  
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);

    
  
  }

  selectFile(): void {
    this.imageInput.nativeElement.click();
    // console.log('input', this.imageInput);
  }

}

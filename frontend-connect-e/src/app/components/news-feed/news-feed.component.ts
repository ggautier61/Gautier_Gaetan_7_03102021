import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {


  ExpressForm: FormGroup = this.formBuilder.group({
    expressInput: [''],
    password: ['']
  })
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}

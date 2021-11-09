import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'snack-confirm',
  templateUrl: './snack-confirm.component.html',
  styleUrls: ['./snack-confirm.component.scss']
})
export class SnackConfirmComponent implements OnInit {

  constructor() { }

  public snackBarRef: MatSnackBarRef<SnackConfirmComponent> | undefined;

  public response = 'KO';

  message = '';

  ngOnInit() { }

  validate(): void {
    this.response = 'OK';
    this.snackBarRef?.dismissWithAction();
  }

  cancel(): void {
    this.response = 'KO';
    this.snackBarRef?.dismissWithAction();
  }

}

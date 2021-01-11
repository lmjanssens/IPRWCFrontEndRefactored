import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  public message: string;
  public title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.message = data.message;
    this.title = data.title;
  }
}

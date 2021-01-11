import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public errorMessage: string;

  constructor(private currentRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setErrorMessageForCurrentRoute();
  }

  private setErrorMessageForCurrentRoute() {
    this.currentRoute.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }
}

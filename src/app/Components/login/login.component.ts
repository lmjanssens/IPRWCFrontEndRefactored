import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error = '';
  public showError = false;
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  async loginButtonClicked() {
    try {
      await this.authService.verifyLogin(this.username, this.password);
      this.router.navigate(['producten']);
    } catch ({error}) {
      this.showError = true;
      console.warn(error.message);
      this.error = error.message;
      setTimeout(() => {
        this.showError = false;
        setTimeout(() => this.error = '', 250);
      }, 5000);
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage = '';
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
      this.errorMessage = error.message;
      setTimeout(() => {
        this.showError = false;
        setTimeout(() => this.errorMessage = '', 250);
      }, 5000);
    }
  }
}

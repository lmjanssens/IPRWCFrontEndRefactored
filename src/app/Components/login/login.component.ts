import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public errorMessage = '';
  public showError = false;
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  async loginButtonClicked() { // TODO: try catch refactor
    try {
      await this.authService.verifyLogin(this.username, this.password);
      await this.router.navigate(['producten']);
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

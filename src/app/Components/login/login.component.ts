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
  public username = '';
  public password = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  public async onLoginButtonClicked() {
    try {
      await this.tryToVerifyLogin();
      await this.navigateUserToProductPage();
    } catch (HttpErrorResponse) {
      console.error(HttpErrorResponse.message);
      this.displayErrorTimeoutMessage(HttpErrorResponse);
    }
  }

  private displayErrorTimeoutMessage(HttpErrorResponse) {
    this.showError = true;
    this.errorMessage = HttpErrorResponse.message;

    setTimeout(() => {
      this.showError = false;
      setTimeout(() => this.errorMessage = '', 250);
    }, 5000);
  }

  private async tryToVerifyLogin() {
    await this.authService.verifyLogin(this.username, this.password);
  }

  private async navigateUserToProductPage() {
    await this.router.navigate(['producten']);
  }
}

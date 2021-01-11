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

  public async loginButtonClicked() { // TODO: try catch refactor
    try {
      await this.authService.verifyLogin(this.username, this.password);
      await this.router.navigate(['producten']);
    } catch (FaultyLoginError) {
      this.showError = true;
      console.warn(FaultyLoginError.message);
      this.errorMessage = FaultyLoginError.message;
      setTimeout(() => {
        this.showError = false;
        setTimeout(() => this.errorMessage = '', 250);
      }, 5000);
    }
  }

  private async tryToVerifyLogin() {
    await this.authService.verifyLogin(this.username, this.password);
  }

  private async navigateUserToProductPage() {
    await this.router.navigate(['producten']);
  }
}

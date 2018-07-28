import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service';
import {UserCredentials} from '../../data';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.less']
})
export class LoginPageComponent {
  public login: string;
  public password: string;

  public actionInProgress = false;

  public constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    if (!!loginService.getAuthToken()) {
      this.router.navigate([`/articles`]);
    }
  }

  public runLogin(): void {
    this.actionInProgress = true;

    this.loginService
      .login(new UserCredentials(this.login, this.password))
      .then(() => {
        this.router.navigate([`/articles`]);
        this.actionInProgress = false;
      });
  }
}

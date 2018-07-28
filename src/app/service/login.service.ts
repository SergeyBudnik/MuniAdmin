import {Injectable} from '@angular/core';
import {LoginHttp} from '../http';
import {CookieService} from 'angular2-cookie/core';
import {UserCredentials} from '../data';

@Injectable()
export class LoginService {
  private authTokenKey = 'muniAdminAuthToken';

  private authToken: string;

  public constructor(
    private loginHttp: LoginHttp,
    private cookieService: CookieService
  ) {}

  public login(userCredentials: UserCredentials): Promise<string> {
    return this.loginHttp
      .login(userCredentials)
      .then(userToken => {
        this.authToken = userToken.token;

        this.cookieService.put(this.authTokenKey, this.authToken);

        return this.authToken;
      });
  }

  public logOff(): void {
    this.clearAuthToken();
  }

  public getAuthToken(): string {
    if (!this.authToken) {
      this.authToken = this.cookieService.get(this.authTokenKey);
    }

    return this.authToken;
  }

  public clearAuthToken(): void {
    this.authToken = null;
    this.cookieService.remove(this.authTokenKey);
  }
}

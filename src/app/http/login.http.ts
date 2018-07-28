import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserToken, UserCredentials} from '../data';
import {HttpOptions} from './http-options';

@Injectable()
export class LoginHttp {
  private root = `${HttpOptions.backendRoot}/login`;

  public constructor(
    private http: HttpClient
  ) {}

  public login(userCredentials: UserCredentials): Promise<UserToken> {
    return this.http
      .post(this.root, userCredentials)
      .toPromise()
      .then(it => <UserToken> it);
  }
}

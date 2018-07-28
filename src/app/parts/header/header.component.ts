import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service';

export type Section = 'ARTICLES' | 'REPORTS';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() public activeSection: Section;

  public constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  public navigate(target: string): void {
    this.router.navigate([target]);
  }

  public logOff(): void {
    this.loginService.clearAuthToken();

    this.router.navigate([`/login`]);
  }
}

import {Component} from '@angular/core';
import {TranslateableComponent} from '../common/translateable.component';
import {ReportsService} from '../../service/reports.service';
import {LoginService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {Report} from '../../data/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.less']
})
export class ReportPageComponent extends TranslateableComponent {
  public loadingInProgress = false;
  public report: Report

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private reportsService: ReportsService
  ) {
    super();

    this.loadingInProgress = true;

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        reportsService
          .getReport(Number(id))
          .then(report => {
            this.report = report;
            this.loadingInProgress = false;
          })
      });
    }
  }
}

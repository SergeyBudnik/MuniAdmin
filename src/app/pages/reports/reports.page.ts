import {TranslateableComponent} from '../common/translateable.component';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Report} from '../../data/report';
import {ReportsService} from '../../service/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.less']
})
export class ReportsPageComponent extends TranslateableComponent {
  public reports: Array<Report> = [];

  public loadingInProgress = false;

  public constructor(
    private router: Router,
    private reportsService: ReportsService
  ) {
    super();

    this.loadingInProgress = true;

    this.reportsService
      .getReports()
      .then(reports => {
        this.reports = reports;

        this.loadingInProgress = false;
      });
  }

  public openReport(report: Report) {
    this.router.navigate([`/reports/${report.id}`]).then(() => {});
  }
}

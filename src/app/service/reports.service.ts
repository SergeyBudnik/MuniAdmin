import {Injectable} from '@angular/core';
import {ReportsHttp} from '../http/reports.http';
import {Report} from '../data/report';

@Injectable()
export class ReportsService {
  public constructor(
    private reportHttp: ReportsHttp
  ) {}

  public getReports(): Promise<Array<Report>> {
    return this.reportHttp.getReports();
  }

  public getReport(id: number): Promise<Report> {
    return this.reportHttp.getReport(id);
  }
}

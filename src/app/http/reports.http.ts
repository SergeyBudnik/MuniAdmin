import {HttpOptions} from './http-options';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Report} from '../data/report';

@Injectable()
export class ReportsHttp {
  private root = `${HttpOptions.backendRoot}/report`;

  public constructor(
    private http: HttpClient
  ) {}

  public getReports(): Promise<Array<Report>> {
    return this.http
      .get<Array<Report>>(this.root)
      .toPromise();
  }

  public getReport(id: number): Promise<Report> {
    return this.http
      .get<Report>(`${this.root}/${id}`)
      .toPromise();
  }
}

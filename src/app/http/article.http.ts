import {Injectable} from '@angular/core';
import {Article} from '../data';
import {HttpClient} from '@angular/common/http';
import {HttpOptions} from './http-options';
import {AddOrUpdateArticle} from '../data/add-or-update-article';

@Injectable()
export class ArticleHttp {
  private root = `${HttpOptions.backendRoot}/article`;

  public constructor(
    private http: HttpClient
  ) {}

  public getArticles(): Promise<Array<Article>> {
    return this.http
      .get<Array<Article>>(this.root)
      .toPromise();
  }

  public getArticle(id: number): Promise<Article> {
    return this.http
      .get<Article>(`${this.root}/${id}`)
      .toPromise();
  }

  public getArticleIcon(id: number): Promise<Blob> {
    return this.http
      .get(`${HttpOptions.imageHostingRoot}/articles/icons/${id}/200x200.png`, {responseType: 'blob'})
      .toPromise();
  }

  public getArticleImage(id: number): Promise<Blob> {
    return this.http
      .get(`${HttpOptions.imageHostingRoot}/articles/images/${id}/600x600.png`, {responseType: 'blob'})
      .toPromise();
  }

  public getArticleListImage(id: number): Promise<Blob> {
    return this.http
      .get(`${HttpOptions.imageHostingRoot}/articles/clippedImages/${id}/600x200.png`, {responseType: 'blob'})
      .toPromise();
  }

  public createArticle(article: AddOrUpdateArticle): Promise<number> {
    return this.http
      .post(`${this.root}`, article)
      .toPromise()
      .then(it => Number(it));
  }

  public updateArticle(id: number, article: AddOrUpdateArticle): Promise<void> {
    return this.http
      .put(`${this.root}/${id}`, article)
      .toPromise()
      .then(() => {});
  }

  public deleteArticle(id: number): Promise<void> {
    return this.http
      .delete(`${this.root}/${id}`)
      .toPromise()
      .then(() => {});
  }
}

import {Injectable} from '@angular/core';
import {ArticleHttp} from '../http/article.http';
import {Article} from '../data';
import {AddOrUpdateArticle} from '../data/add-or-update-article';

@Injectable()
export class ArticleService {
  public constructor(
    private articleHttp: ArticleHttp
  ) {}

  public getArticles(): Promise<Array<Article>> {
    return this.articleHttp.getArticles();
  }

  public getArticle(id: number): Promise<Article> {
    return this.articleHttp.getArticle(id);
  }

  public getArticleIcon(id: number): Promise<Blob> {
    return this.articleHttp.getArticleIcon(id);
  }

  public getArticleImage(id: number): Promise<Blob> {
    return this.articleHttp.getArticleImage(id);
  }

  public getArticleListImage(id: number): Promise<Blob> {
    return this.articleHttp.getArticleListImage(id);
  }

  public createArticle(article: AddOrUpdateArticle): Promise<number> {
    return this.articleHttp.createArticle(article);
  }

  public updateArticle(id: number, article: AddOrUpdateArticle): Promise<void> {
    return this.articleHttp.updateArticle(id, article);
  }

  public deleteArticle(id: number): Promise<void> {
    return this.articleHttp.deleteArticle(id);
  }
}

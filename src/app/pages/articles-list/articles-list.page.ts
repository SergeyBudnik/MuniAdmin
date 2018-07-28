import {Component} from '@angular/core';
import {ArticleService} from '../../service/article.service';
import {Article} from '../../data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.page.html',
  styleUrls: ['./articles-list.page.less']
})
export class ArticlesListPageComponent {
  public articles: Array<Article> = [];

  public loadingInProgress = false;
  public currentTime = new Date().getTime();

  public constructor(
    private router: Router,
    private articleService: ArticleService
  ) {
    this.loadingInProgress = true;

    this.articleService
      .getArticles()
      .then(articles => {
        this.articles = articles.sort((a1, a2) => {
          const firstArticleExpired = a1.expirationDate > this.currentTime;
          const secondArticleExpired = a2.expirationDate > this.currentTime;

          if (firstArticleExpired && !secondArticleExpired) {
            return -1;
          } else if (!firstArticleExpired && secondArticleExpired) {
            return 1;
          } else {
            return a2.expirationDate - a1.expirationDate;
          }
        });

        this.loadingInProgress = false;
      });
  }

  public getArticleTitle(article: Article): string {
    if (!!article.translatedArticle['ENGLISH']) {
      return article.translatedArticle['ENGLISH'].title;
    } else if (!!article.translatedArticle['RUSSIAN']) {
      return article.translatedArticle['RUSSIAN'].title;
    } else if (!!article.translatedArticle['HEBREW']) {
      return article.translatedArticle['HEBREW'].title;
    } else {
      return '';
    }
  }

  public openArticle(article: Article) {
    this.router.navigate([`/articles/${article.id}`]).then(() => {});
  }

  public addNewArticle(): void {
    this.router.navigate([`/articles/new`]).then(() => {});
  }
}

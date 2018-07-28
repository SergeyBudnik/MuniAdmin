import {Component, ViewContainerRef} from '@angular/core';
import {LoginService} from '../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {Article, Language, TranslatedArticle} from '../../data';
import {ArticleService} from '../../service/article.service';
import {SelectItem} from '../../parts/controls/select-item';
import {AddOrUpdateArticle, AnswerInfo, ArticleInfo, QuestionInfo} from '../../data/add-or-update-article';
import {ToastsManager} from 'ng2-toastr';
import {TranslateableComponent} from '../common/translateable.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.less']
})
export class ArticlePageComponent extends TranslateableComponent {
  public article = new Article();
  public loadingInProgress = false;
  public actionInProgress = false;

  public image: string = null;
  public croppedImage: string = null;

  public listImage: string = null;
  public croppedListImage: string = null;

  public currentLanguage: Language = null;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private articleService: ArticleService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    super();

    this.toastr.setRootViewContainerRef(vcr);

    this.loadingInProgress = true;

    if (!this.loginService.getAuthToken()) {
      this.router.navigate([`/login`]);
    } else {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');

        if (id !== 'new') {
          this.articleService
            .getArticle(Number(id))
            .then(article => {
              this.article = article;

              this.articleService
                .getArticleImage(this.article.id)
                .then(it => {
                  this.setCropperImage(it, res => {
                    this.image = res;
                    this.croppedImage = res;
                  });
                });

              this.articleService
                .getArticleListImage(this.article.id)
                .then(it => {
                  this.setCropperImage(it, res => {
                    this.listImage = res;
                    this.croppedListImage = res;
                  });
                });

              this.loadingInProgress = false;
            });
        } else {
          this.loadingInProgress = false;
        }
      });
    }
  }

  public onSendPushChanged(sendPushString: string): void {
    this.article.sendPushOnRelease = sendPushString === 'true';
  }

  public addTranslation(language: Language): void {
    this.article.translatedArticle[language] = new TranslatedArticle();
  }

  public getLanguages(): Array<Language> {
    const languages = [];

    if (this.article.translatedArticle.ENGLISH) {
      languages.push('ENGLISH');
    }

    if (this.article.translatedArticle.RUSSIAN) {
      languages.push('RUSSIAN');
    }

    if (this.article.translatedArticle.HEBREW) {
      languages.push('HEBREW');
    }

    return languages;
  }

  public goToLocalization(language: Language): void {
    this.currentLanguage = language;
  }

  public deleteTranslation(language: Language): void {
    delete this.article.translatedArticle[language];

    this.article.questions = this.article.questions.filter(it => !it.translatedQuestion[language]);
  }

  public closeTranslation() {
    this.currentLanguage = null;
  }

  public getArticleTypeItems(): Array<SelectItem> {
    return [
      new SelectItem('Новость', 'News'),
      new SelectItem('Мероприятие', 'Event'),
      new SelectItem('Опрос', 'Survey')
    ]
  }

  public getSendPushItems(): Array<SelectItem> {
    return [
      new SelectItem('Да', 'true'),
      new SelectItem('Нет', 'false')
    ]
  }

  public deleteArticle(): void {
    this.actionInProgress = true;

    this.toastr.warning(`Cтатья '${this.article.id}' удаляется`);

    this.articleService
      .deleteArticle(this.article.id)
      .then(() => {
        this.toastr.success(`Cтатья '${this.article.id}' успешно удалена`);

        this.actionInProgress = false;

        this.router.navigate([`/articles`]);
      });
  }

  public saveArticle(): void {
    const croppedImage = this.croppedImage ?
      this.croppedImage.replace(/^data:image\/[a-z]+;base64,/, "") :
      undefined;

    const croppedListImage = this.croppedListImage ?
      this.croppedListImage.replace(/^data:image\/[a-z]+;base64,/, "") :
      undefined;

    const addOrUpdateArticle = new AddOrUpdateArticle(new ArticleInfo(
      this.article.type,
      this.article.translatedArticle,
      this.article.questions.map(question => new QuestionInfo(
        question.answerType,
        question.translatedQuestion,
        question.answers.map(answer => answer == null ? null : new AnswerInfo(
          answer.translatedAnswer,
          null
        )),
        question.showResult
      )),
      croppedImage,
      croppedImage,
      croppedListImage,
      this.article.video,
      this.article.sendPushOnRelease,
      this.article.releaseDate,
      this.article.releaseDate,
      this.article.expirationDate,
      this.article.expirationDate
    ));

    this.actionInProgress = true;

    this.toastr.warning(`Cтатья сохраняется`);

    if (!!this.article.id) {
      this.articleService
        .updateArticle(this.article.id, addOrUpdateArticle)
        .then(() => {
          this.toastr.success(`Cтатья '${this.article.id}' успешно сохранена`);

          this.actionInProgress = false;
        })
        .catch(() => {
          this.toastr.error(`Произошла ошибка`);

          this.actionInProgress = false;
        });
    } else {
      this.articleService
        .createArticle(addOrUpdateArticle)
        .then(() => {
          this.toastr.success(`Новая статья успешно сохранена`);

          this.actionInProgress = false;
        })
        .catch((error) => {
          this.toastr.error(`Произошла ошибка: '${error.error}'`);

          this.actionInProgress = false;
        });
    }
  }

  public setCropperImage(blob: Blob, loadingListener: (string) => void): void {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      loadingListener(reader.result);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }
}

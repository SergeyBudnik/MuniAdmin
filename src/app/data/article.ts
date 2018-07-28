import {Question} from './question';

export type ArticleType = 'NEWS' | 'EVENT' | 'SURVEY';

export class TranslatedArticle {
  public constructor(
    public title: string = '',
    public description: string = '',
    public text: string = '',
    public categories: Array<string> = []
  ) {}
}

export class TranslatedArticles {
  public constructor(
    public ENGLISH: TranslatedArticle = undefined,
    public RUSSIAN: TranslatedArticle = undefined,
    public MACEDONIAN: TranslatedArticle = undefined,
    public ARABIC: TranslatedArticle = undefined,
    public HEBREW: TranslatedArticle = undefined,
  ) {}
}

export class Article {
  public constructor(
    public id: number = null,
    public type: ArticleType = 'NEWS',
    public translatedArticle: TranslatedArticles = new TranslatedArticles(),
    public questions: Array<Question> = [],
    public video: string = null,
    public sendPushOnRelease: boolean = false,
    public creationDate: number = null,
    public releaseDate: number = new Date().getTime(),
    public calendarStartDate: number = new Date().getTime(),
    public calendarFinishDate: number = new Date().getTime(),
    public expirationDate: number = new Date().getTime(),
    public lastUpdateDate: number = null
  ) {}
}

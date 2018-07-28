import {ArticleType, TranslatedArticle, TranslatedArticles} from './article';
import {QuestionAnswerType, TranslatedQuestion, TranslatedQuestions} from './question';
import {TranslatedAnswer, TranslatedAnswers} from './answer';
import {Language} from './language';

export class AnswerInfo {
  public constructor(
    public translatedAnswer: TranslatedAnswers,
    public icon: string
  ) {}
}

export class QuestionInfo {
  public constructor(
    public answerType: QuestionAnswerType,
    public translatedQuestion: TranslatedQuestions,
    public answers: Array<AnswerInfo>,
    public showResult: boolean,
  ) {}
}

export class ArticleInfo {
  public constructor(
    public type: ArticleType,
    public translatedArticle: TranslatedArticles,
    public questions: Array<QuestionInfo>,
    public icon: string,
    public image: string,
    public clippedImage: string,
    public video: string,
    public sendPushOnRelease: boolean,
    public releaseDate: number,
    public calendarStartDate: number,
    public calendarFinishDate: number,
    public expirationDate: number,
  ) {}
}

export class AddOrUpdateArticle {
  public constructor(
    public article: ArticleInfo
  ) {}
}

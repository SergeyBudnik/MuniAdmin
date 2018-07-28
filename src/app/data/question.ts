import {Answer} from './answer';
import {TranslatedArticle} from './article';

export type QuestionAnswerType = 'FIVE_POINTS' | 'THREE_VARIANTS' | 'DYCHOTOMOUS';

export class TranslatedQuestion {
  public constructor(
    public text: string = ''
  ) {}
}

export class TranslatedQuestions {
  public constructor(
    public ENGLISH: TranslatedQuestion = undefined,
    public RUSSIAN: TranslatedQuestion = undefined,
    public MACEDONIAN: TranslatedQuestion = undefined,
    public ARABIC: TranslatedQuestion = undefined,
    public HEBREW: TranslatedQuestion = undefined,
  ) {}
}

export class Question {
  public constructor(
    public id: number,
    public answerType: QuestionAnswerType,
    public translatedQuestion: TranslatedQuestions,
    public answers: Array<Answer>,
    public showResult: boolean
  ) {}
}

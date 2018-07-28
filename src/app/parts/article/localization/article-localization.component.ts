import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../../controls/select-item';
import {
  Answer, Article, Language, Question, QuestionAnswerType, TranslatedAnswer, TranslatedAnswers,
  TranslatedQuestion, TranslatedQuestions
} from '../../../data';

@Component({
  selector: '[app-article-localization]',
  templateUrl: './article-localization.component.html',
  styleUrls: ['./article-localization.component.less']
})
export class ArticleLocalizationComponent {
  @Input() public article: Article;
  @Input() public language: Language;

  @Output() public onClose: EventEmitter<void> = new EventEmitter<void>();

  public currentQuestionIndex: number = 0;

  public getAnswerTypes(): Array<SelectItem> {
    return [
      new SelectItem('Пять вариантов', 'FIVE_POINTS'),
      new SelectItem('Три варианта', 'THREE_VARIANTS'),
      new SelectItem('Два варианта', 'DYCHOTOMOUS')
    ];
  }

  public setCurrentQuestion(index: number) {
    this.currentQuestionIndex = index;
  }

  public getQuestions(): Array<Question> {
    switch (this.language) {
      case 'ENGLISH':
        return this.article.questions.filter(it => it.translatedQuestion.ENGLISH);
      case 'RUSSIAN':
        return this.article.questions.filter(it => it.translatedQuestion.RUSSIAN);
      case 'HEBREW':
        return this.article.questions.filter(it => it.translatedQuestion.HEBREW);
      default:
        throw new Error(`Unexpected '${this.language}' language`);
    }
  }

  public getTranslatedQuestion(question: Question): TranslatedQuestion {
    switch (this.language) {
      case 'ENGLISH':
        return question.translatedQuestion.ENGLISH;
      case 'HEBREW':
        return question.translatedQuestion.HEBREW;
      case 'RUSSIAN':
        return question.translatedQuestion.RUSSIAN;
      default:
        throw new Error(`Language '${this.language}' is not expected`);
    }
  }

  public getTranslatedAnswer(answer: Answer): TranslatedAnswer {
    switch (this.language) {
      case 'ENGLISH':
        return answer.translatedAnswer.ENGLISH;
      case 'HEBREW':
        return answer.translatedAnswer.HEBREW;
      case 'RUSSIAN':
        return answer.translatedAnswer.RUSSIAN;
      default:
        throw new Error(`Language '${this.language}' is not expected`);
    }
  }

  public addQuestion() {
    const translations: TranslatedQuestions = new TranslatedQuestions();

    switch (this.language) {
      case 'ENGLISH':
        translations.ENGLISH = new TranslatedQuestion();
        break;
      case 'HEBREW':
        translations.HEBREW = new TranslatedQuestion();
        break;
      case 'RUSSIAN':
        translations.RUSSIAN = new TranslatedQuestion();
        break;
      default:
        throw new Error(`Language '${this.language}' is not expected`);
    }

    this.article.questions.push(new Question(
      null,
      'FIVE_POINTS',
      translations,
      this.getFivePointsAnswers(),
      true
    ));
  }

  public removeQuestion(index: number) {
    const res = [];

    for (let i = 0; i < this.article.questions.length; i++) {
      if (i !== index) {
        res.push(this.article.questions[i]);
      }
    }

    this.currentQuestionIndex = 0;
    this.article.questions = res;
  }

  public onAnswerTypeChange(question: Question, answerType: QuestionAnswerType): void {
    question.answerType = answerType;

    switch (answerType) {
      case 'FIVE_POINTS':
        question.answers = this.getFivePointsAnswers();
        break;
      case 'THREE_VARIANTS':
        question.answers = this.getThreeVariantsAnswers();
        break;
      case 'DYCHOTOMOUS':
        question.answers = this.getDychotomousAnswers();
        break;
    }
  }

  public closeTranslation(): void {
    this.onClose.emit();
  }

  public onShowResultChanged(question: Question, showResult: string): void {
    question.showResult = showResult === 'true';
  }

  public getShowResultItems(): Array<SelectItem> {
    return [
      new SelectItem('Да', 'true'),
      new SelectItem('Нет', 'false')
    ];
  }

  private getFivePointsAnswers(): Array<Answer> {
    return [
      new Answer(null, this.generateTranslatedAnswer(true), false),
      new Answer(null, this.generateTranslatedAnswer(false), false),
      new Answer(null, this.generateTranslatedAnswer(false), false),
      new Answer(null, this.generateTranslatedAnswer(false), false),
      new Answer(null, this.generateTranslatedAnswer(true), false)
    ];
  }

  private getThreeVariantsAnswers(): Array<Answer> {
    return [
      new Answer(null, this.generateTranslatedAnswer(true), false),
      new Answer(null, this.generateTranslatedAnswer(true), false),
      new Answer(null, this.generateTranslatedAnswer(true), false)
    ];
  }

  private getDychotomousAnswers(): Array<Answer> {
    return [
      new Answer(null, this.generateTranslatedAnswer(true), false),
      new Answer(null, this.generateTranslatedAnswer(true), false)
    ];
  }

  private generateTranslatedAnswer(hasContent: boolean): TranslatedAnswers {
    const translation: TranslatedAnswers = new TranslatedAnswers();

    if (hasContent) {
      switch (this.language) {
        case 'ENGLISH':
          translation.ENGLISH = new TranslatedAnswer();
          break;
        case 'HEBREW':
          translation.HEBREW = new TranslatedAnswer();
          break;
        case 'RUSSIAN':
          translation.RUSSIAN = new TranslatedAnswer();
          break;
        default:
          throw new Error(`Language '${this.language}' is not expected`);
      }
    }

    return translation;
  }
}

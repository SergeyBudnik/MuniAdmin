export class TranslatedAnswer {
  public constructor(
    public text: string = undefined
  ) {}
}

export class TranslatedAnswers {
  public constructor(
    public ENGLISH: TranslatedAnswer = undefined,
    public RUSSIAN: TranslatedAnswer = undefined,
    public MACEDONIAN: TranslatedAnswer = undefined,
    public ARABIC: TranslatedAnswer = undefined,
    public HEBREW: TranslatedAnswer = undefined,
  ) {}
}

export class Answer {
  public constructor(
    public id: number,
    public translatedAnswer: TranslatedAnswers,
    public hasIcon: boolean
  ) {}
}

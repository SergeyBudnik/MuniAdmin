import {Language} from '../../data';

export class TranslateableComponent {
  public getLanguageTranslation(language: Language): string {
    switch (language) {
      case 'ENGLISH':
        return 'Английский';
      case 'RUSSIAN':
        return 'Русский';
      case 'HEBREW':
        return 'Иврит';
    }
  }
}

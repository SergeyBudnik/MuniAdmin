export type Language = 'ENGLISH' | 'RUSSIAN' | 'MACEDONIAN' | 'ARABIC' | 'HEBREW';

export class LanguageUtils {
  public static fromString(value: string): Language {
    switch (value) {
      case 'ENGLISH':
        return 'ENGLISH'
      case 'RUSSIAN':
        return 'RUSSIAN';
      case 'MACEDONIAN':
        return 'MACEDONIAN';
      case 'ARABIC':
        return 'ARABIC';
      case 'HEBREW':
        return 'HEBREW';
    }
  }
}

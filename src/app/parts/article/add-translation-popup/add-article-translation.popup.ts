import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../../controls/select-item';

@Component({
  selector: 'app-add-article-translation-popup',
  templateUrl: './add-article-translation.popup.html',
  styleUrls: ['./add-article-translation.popup.less']
})
export class AddArticleTranslationPopupComponent {
  @Input() public value: string = 'ENGLISH';

  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  public items: Array<SelectItem> = [
    new SelectItem('Английский', 'ENGLISH'),
    new SelectItem('Иврит', 'HEBREW'),
    new SelectItem('Русский', 'RUSSIAN'),
  ];

  public onValueChange(value: string) {
    this.value = value;
  }

  public addLanguage() {
    this.onChange.emit(this.value);
  }
}

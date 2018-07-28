import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: '[app-rich-text-field-control]',
  templateUrl: './rich-text-field-control.component.html',
  styleUrls: ['./rich-text-field-control.component.less']
})
export class RichTextFieldControlComponent {
  @Input() public name: string;
  @Input() public label: string;
  @Input() public maxLength: number;
  @Input() public value: string;

  @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();

  public onContentChanged(content: string): void {
    this.value = content;

    this.onChange.emit(content);
  }
}

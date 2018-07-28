import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: '[app-text-field-control]',
  templateUrl: './text-field-control.component.html',
  styleUrls: ['./text-field-control.component.less']
})
export class TextFieldControlComponent {
  @Input() public name: string;
  @Input() public label: string;
  @Input() public maxLength: number;
  @Input() public value: string;

  @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();

  public onValueChange(value: string) {
    this.value = value;

    this.onChange.emit(value);
  }
}

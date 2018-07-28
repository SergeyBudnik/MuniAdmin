import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SelectItem} from '../select-item';

@Component({
  selector: '[app-form-select-control]',
  templateUrl: './form-select.control.html',
  styleUrls: ['./form-select.control.less']
})
export class FormSelectControl {
  @Input() name: string;
  @Input() label: string;
  @Input() value: string;
  @Input() items: Array<SelectItem>;
  @Input() valid: boolean;

  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  public onValueChange(value: string) {
    this.onChange.emit(value);
  }
}

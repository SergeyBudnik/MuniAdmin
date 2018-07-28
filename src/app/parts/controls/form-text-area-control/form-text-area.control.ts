import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: '[app-form-text-area-control]',
  templateUrl: './form-text-area.control.html',
  styleUrls: ['./form-text-area.control.less']
})
export class FormTextAreaControlComponent {
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

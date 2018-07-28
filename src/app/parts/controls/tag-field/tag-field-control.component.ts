import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: '[app-tag-field-control]',
  templateUrl: './tag-field-control.component.html',
  styleUrls: ['./tag-field-control.component.less']
})
export class TagFieldControlComponent {
  @Input() public name: string;
  @Input() public label: string;
  @Input() public maxLength: number;
  @Input() public value: Array<string>;

  @Output() public onChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  public onValueAdded(value: any): void {
    const res: Array<string> = [value.value];

    this.value.forEach(it => res.push(it));

    this.value = res;

    this.onChange.emit(this.value);
  }

  public onValueRemoved(value: any): void {
    const res: Array<string> = [];

    this.value.filter(it => it !== value).forEach(it => res.push(it));

    this.value = res;

    this.onChange.emit(res);
  }}

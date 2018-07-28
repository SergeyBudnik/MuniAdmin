import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: '[app-form-date-field-control]',
  templateUrl: './form-date-field.control.html',
  styleUrls: ['./form-date-field.control.less']
})
export class DateFieldControlComponent {
  @Input() public name: string;
  @Input() public label: string;
  @Input('value') public set setValue(value: number) {
    const date = new Date(value);

    this.value.date.year = date.getFullYear();
    this.value.date.month = date.getMonth() + 1;
    this.value.date.day = date.getDate();
  }

  public value = {date: {year: 0, month: 0, day: 0}};

  @Output() public onChange: EventEmitter<number> = new EventEmitter();

  public onValueChange(event): void {
    const time = new Date(
      event.date.year,
      event.date.month - 1,
      event.date.day,
      0, 0, 0, 0
    ).getTime();

    this.onChange.emit(time);
  }
}

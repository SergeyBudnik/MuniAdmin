import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: '[app-form-image-field]',
  templateUrl: './form-image-field.control.html',
  styleUrls: ['./form-image-field.control.less']
})
export class FormImageFieldControlComponent {
  @Input() public id: string;

  @Input() public controlWidth: number;
  @Input() public controlHeight: number;

  @Input() public minImageWidth: number;
  @Input() public minImageHeight: number;

  @Input() public aspectRatio: number;

  @Input() public image: string;
  @Input() public label: string;

  @Output() public onChange: EventEmitter<string> = new EventEmitter();

  @ViewChild('imageValidationTrigger') public imageValidationTrigger: ElementRef;

  public imageChangedEvent: any;

  public oldCropper = null;
  public newCropper = {x1: 0, y1: 0, x2: 0, y2: 0};

  public validationModalVisible = false;

  public onImageCropped(croppedImage: string): void {
    if (!this.oldCropper) {
      this.oldCropper = {
        x1: this.newCropper.x1,
        y1: this.newCropper.y1,
        x2: this.newCropper.x2,
        y2: this.newCropper.y2
      };
    }

    const i = new Image();

    const listener = (w: number, h: number) => {
      if (w < this.minImageWidth || h < this.minImageHeight) {
        this.newCropper.x1 = this.oldCropper.x1;
        this.newCropper.y1 = this.oldCropper.y1;
        this.newCropper.x2 = this.oldCropper.x2;
        this.newCropper.y2 = this.oldCropper.y2;
      } else {
        this.oldCropper.x1 = this.newCropper.x1;
        this.oldCropper.y1 = this.newCropper.y1;
        this.oldCropper.x2 = this.newCropper.x2;
        this.oldCropper.y2 = this.newCropper.y2;
      }
    };

    i.onload = function(){
      listener(i.width, i.height);
    };

    i.src = croppedImage;

    this.onChange.emit(croppedImage);
  }

  public onImageUploaded(event) {
    this.onFileUploaded(event, () => this.imageChangedEvent = event);
  }

  private onFileUploaded(event: any, loadingListener: () => {}) {
    const files = event.srcElement.files;
    const reader = new FileReader();

    const minImageWidth = this.minImageWidth;
    const minImageHeight = this.minImageHeight;

    const imageValidationTrigger = this.imageValidationTrigger;

    const changeEmitter = value => this.onChange.emit(value);

    reader.onload = function() {
      const image = new Image();

      const listener = (w: number, h: number) => {
        if (w < minImageWidth || h < minImageHeight) {
          imageValidationTrigger.nativeElement.click();
        } else {
          loadingListener();
        }
      };

      image.onload = function(){
        listener(image.width, image.height);
      };

      image.src = reader.result;

      changeEmitter(image.src);
    };

    reader.readAsDataURL(files[0]);
  }
}

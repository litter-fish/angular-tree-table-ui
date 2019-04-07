import {Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {Col} from '../TreeNode';

@Component({
  selector: "exe-title",
  template: `
    <span class="" style="padding-left: 0px;">{{col.label}}</span>
    `,
})
export class TitleComponent {

  @Input() col: Col;
  @Input() colNumber: number;
}

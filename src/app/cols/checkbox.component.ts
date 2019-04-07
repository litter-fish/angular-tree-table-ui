import {Component, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import {Col, ColEvent, EventType, TreeNode} from '../TreeNode';

@Component({
  selector: "exe-checkbox",
  template: `
    <div class="checkbox" id="{{col.id}}"
         style="padding-left: 0px;margin-top: 0px;margin-bottom: 0px;">
      <label>
        <input type="checkbox" id="{{col.id}}_checkbox" value="{{col.data.defaultValue}}"
               style="padding-left: 2px;">{{col.label}}
        </label>
    </div>
    `,
})
export class CheckboxComponent implements OnInit, AfterViewInit {

  @Input() col: Col;
  @Input() row: TreeNode;
  @Input() colNumber: number;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const colEvent = this.col.colEvent;
    if (colEvent && colEvent.length > 0) {
      const nativeElement = this.elementRef.nativeElement.querySelector('input');
      [].concat(colEvent).forEach((colEvent: ColEvent) => {
        switch (colEvent.eventType) {
          case EventType.BLUR:
            nativeElement.addEventListener('blur', colEvent.callBack.bind(this, this.col, this.row));
            break;
          case EventType.FOCUS:
            nativeElement.addEventListener('focus', colEvent.callBack.bind(this, this.col, this.row));
            break;
          case EventType.CLICK:
            nativeElement.addEventListener('click', colEvent.callBack.bind(this, this.col, this.row));
            break;
        }
      })
    }
  }

}

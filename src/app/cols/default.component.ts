import {Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import {Col, ColEvent, EventType, TreeNode} from '../TreeNode';

@Component({
  selector: "exe-default",
  template: `
    <span class="" style="padding-left: 2px;">{{col.label}}</span>
    `,
})
export class DefaultComponent implements AfterViewInit, OnChanges {

  @Input() col: Col;
  @Input() row: TreeNode;
  @Input() colNumber: number;

  constructor(private elementRef: ElementRef) {}


  ngAfterViewInit(): void {
    const colEvent = this.col.colEvent;
    if (colEvent && colEvent.length > 0) {
      [].concat(colEvent).forEach((colEvent: ColEvent) => {
        switch (colEvent.eventType) {
          case EventType.CLICK:
            this.elementRef.nativeElement.addEventListener('click', colEvent.callBack.bind(this, this.col, this.row));
            break;
        }
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['col']) {
      debugger;
    }
    if (changes['row']) {
      debugger;
    }
  }

}

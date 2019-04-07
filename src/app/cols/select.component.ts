import {Component, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import {Col, ColEvent, EventType, TreeNode} from '../TreeNode';

@Component({
  selector: "exe-select",
  template: `
    <select id="{{col.id}}_select" style="width: 90%;height: 24px;" [(ngModel)]="defaultValue">
      <option *ngFor="let data of col.data.data" value="{{data.value}}">{{data.label}}</option>
    </select>
    `,
})
export class SelectComponent implements OnInit, AfterViewInit {

  @Input() col: Col;
  @Input() row: TreeNode;
  @Input() colNumber: number;

  defaultValue;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.defaultValue = this.col.data.defaultValue;
  }

  ngAfterViewInit(): void {
    const colEvent = this.col.colEvent;
    if (colEvent && colEvent.length > 0) {
      const nativeElement = this.elementRef.nativeElement.querySelector('select');
      [].concat(colEvent).forEach((colEvent: ColEvent) => {
        switch (colEvent.eventType) {
          case EventType.CHANGE:
            nativeElement.addEventListener('change', colEvent.callBack.bind(this, this.col, this.row));
            break;
        }
      })
    }
  }
}

import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {Col, ColEvent, OprType, TreeNode} from '../TreeNode';
import {EventService, EventServiceType} from '../service/event.service';

@Component({
  selector: "exe-opr",
  template: `
    <ng-container *ngFor="let event of col.colEvent">
      <ng-container *ngIf="event.eventType.toString() == '50'">
        <button type="button" class="btn btn-default btn-xs" value="{{col.id}}" id="add" title="Add">
          <span class="glyphicon glyphicon-plus" aria-hidden="true" style="padding: 0 0 !important;"></span>
        </button>
      </ng-container>
      <ng-container *ngIf="event.eventType.toString() == '51'">
        <button type="button" class="btn btn-default btn-xs" value="{{col.id}}" id="remove" title="Remove" (click)="oprEvent(event.eventType);">
          <span class="glyphicon glyphicon-trash" aria-hidden="true" style="padding: 0 0 !important;"></span>
        </button>
      </ng-container>
      <ng-container *ngIf="event.eventType.toString() == '52'">
        <button type="button" class="btn btn-default btn-xs" value="{{col.id}}" id="config" title="Config" (click)="oprEvent(event.eventType);">
          <span class="glyphicon glyphicon-cog" aria-hidden="true" style="padding: 0 0 !important;"></span>
        </button>
      </ng-container>
    </ng-container>
    `,
})
export class OprComponent implements OnInit, AfterViewInit {

  @Input() col: Col;
  @Input() row: TreeNode;
  @Input() colNumber: number;

  constructor(
    private elementRef: ElementRef,
    private eventService: EventService) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const colEvent = this.col.colEvent;
    if (colEvent && colEvent.length > 0) {
      let nativeElement;
      [].concat(colEvent).forEach((colEvent: ColEvent) => {
        switch (colEvent.eventType) {
          case OprType.ADD:
            nativeElement = this.elementRef.nativeElement.querySelector('#'.concat('add'));
            nativeElement.addEventListener('click', colEvent.callBack.bind(this, this.row.id));
            break;
          case OprType.REMOVE:
            nativeElement = this.elementRef.nativeElement.querySelector('#'.concat('remove'));
            nativeElement.addEventListener('click', colEvent.callBack.bind(this.row.id));
            break;
          case OprType.MODIFY:
            nativeElement = this.elementRef.nativeElement.querySelector('#'.concat('config'));
            nativeElement.addEventListener('click', colEvent.callBack.bind(this.row.id));
            break;
        }
      })
    }
  }

  oprEvent(eventType) {
    this.eventService.bindEvent(new EventServiceType(eventType, this.row.id));
    switch (eventType) {
      case OprType.ADD:
        break;
      case OprType.REMOVE:
        const oprLi = event.currentTarget['parentElement'].parentElement.parentElement.parentElement.parentElement;
        oprLi.parentElement.removeChild(oprLi);
        break;
    }
  }
}

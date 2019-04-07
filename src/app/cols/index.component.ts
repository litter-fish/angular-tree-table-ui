import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {Col, ColEvent, EventType, OprType, TreeNode} from '../TreeNode';
import {EventService, EventServiceType} from '../service/event.service';

@Component({
  selector: "exe-index",
  template: `
    <div class="branch expanded" id="{{col.id}}">
      <span class="indenter" (click)="isShow();">
        <a href="#" title="Expand" *ngIf="hasChilderen">&nbsp;</a>
        <ng-container *ngIf="!hasChilderen">&nbsp;&nbsp;&nbsp;&nbsp;</ng-container>
      </span>
      <span class="{{hasChilderen ? 'folder' : 'file'}}">
        <span class="label-text" style="padding-left: 0px;">{{col.label}}</span>
      </span>
    </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit, AfterViewInit {
  @Input() col: Col;
  @Input() hasChilderen: boolean = false;
  @Input() row: TreeNode;
  @Input() colNumber: number;
  @Output() show: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef,
              private eventService: EventService,
              private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const colEvent = this.col.colEvent;
    const nativeElement = this.elementRef.nativeElement;
    if (colEvent && colEvent.length > 0) {
      const elementRef = nativeElement.querySelector('.label-text');
      [].concat(colEvent).forEach((colEvent: ColEvent) => {
        switch (colEvent.eventType) {
          case EventType.CLICK:
            elementRef.addEventListener('click', colEvent.callBack.bind(this, this.col, this.row));
            break;
          case EventType.DBCLICK:
            elementRef.addEventListener('dbclick', colEvent.callBack.bind(this, this.col, this.row));
            break;
        }
      })
    }
    this.elementRef.nativeElement.querySelector('.indenter').style = 'padding-left: '.concat(Number(this.col['index']) * 20 + '', 'px');

    const div = nativeElement.querySelector('div');
    const class_ = div.getAttribute('class');
    const clazz = class_.split(' ');

    if (this.row.isShowChildrens) {
      clazz[clazz.length - 1] = 'expanded';
    } else {
      clazz[clazz.length - 1] = 'collapsed';
    }
    div.setAttribute('class', clazz.join(' '));
    this.cdRef.markForCheck();
  }

  isShow() {

    const nativeElement = this.elementRef.nativeElement;
    const div = nativeElement.querySelector('div');
    const class_ = div.getAttribute('class');
    const clazz = class_.split(' ');
    let isShowChildrens = true;
    if (clazz[clazz.length - 1] === 'expanded') {
      clazz[clazz.length - 1] = 'collapsed';
      div.setAttribute('class', clazz.join(' '));
      isShowChildrens = false;
    } else {
      clazz[clazz.length - 1] = 'expanded';
      div.setAttribute('class', clazz.join(' '));
      isShowChildrens = true;
    }

    this.show.emit();

    this.eventService.bindEvent(new EventServiceType(OprType.INDEX, {id: this.row.id, row: this.row, isShowChildrens: isShowChildrens}))
    this.cdRef.markForCheck();
  }

}

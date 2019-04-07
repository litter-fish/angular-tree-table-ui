import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {EventType, OprType} from '../TreeNode';

@Injectable()
export class EventService {

  private eventSubject: Subject<any> = new Subject();

  public subscribeEventSubject() {
    return this.eventSubject;
  }

  public bindEvent(value: EventServiceType) {
    this.eventSubject.next(value);
  }

}

export class EventServiceType {
  constructor(public eventType: EventType | OprType, public eventServiceData?: any) {}
}

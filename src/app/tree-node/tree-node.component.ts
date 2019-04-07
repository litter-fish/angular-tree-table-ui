import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {OprType, TreeNode} from '../TreeNode';
import {EventService, EventServiceType} from '../service/event.service';
import {Subscriber} from 'rxjs';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnChanges, OnInit, OnDestroy {

  @Input() nodes: TreeNode[];

  subscribeArr: Subscriber<any>[] = [];

  colNumber = 12 / 3;

  constructor(public eventService: EventService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes']) {
      this.colNumber = Math.floor(12 / this.nodes[0].cols.length);
      this.init();
    }
  }

  private init() {
    for (const node of this.nodes) {
      let index = 0;
      this.addIndex(node, index);
    }
  }

  private addIndex(node: TreeNode, index) {
    node.cols[0][0]['index'] = index;
    for (let i = 0; i < node.cols.length; i++) {
      if (node.cols[i][0].clazz === null || node.cols[i][0].clazz === undefined || !node.cols[i][0].clazz.startsWith('col-md-')) {
        if (this.nodes[0].cols[i][0].clazz === null || this.nodes[0].cols[i][0].clazz === undefined || this.nodes[0].cols[i][0].clazz === '') {
          node.cols[i][0].clazz = 'col-md-' + this.colNumber;
        } else {
          node.cols[i][0].clazz = this.nodes[0].cols[i][0].clazz;
        }
      }
    }
    if (node.childrens.length > 0) {
      index++;
      for (const n of node.childrens) {
        this.addIndex(n, index);
      }
    }
  }

  ngOnInit(): void {
    this.subscribeArr.push(this.eventService.subscribeEventSubject().subscribe((eventData: EventServiceType) => {
      switch (eventData.eventType) {
        case OprType.ADD:
          console.log(eventData.eventServiceData);
          this.addNode(this.nodes, eventData.eventServiceData['id'], eventData.eventServiceData['node']);
          this.init();
          break;
        case OprType.REMOVE:
          console.log(eventData.eventServiceData);
          this.removeNode(this.nodes, eventData.eventServiceData);
          break;
        case OprType.INDEX:
          const node = this.getNode(this.nodes, eventData.eventServiceData.id);
          node.isShowChildrens = eventData.eventServiceData.isShowChildrens;
          break;
      }
    }) as Subscriber<any>);
  }

  removeNode(nodes, id) {
    const index = nodes.findIndex(n => {
      return n.id === id;
    });
    if (index > -1) {
      Array.prototype.splice.call(nodes, index, 1);
    } else {
      for (const n of nodes) {
        if (n.childrens === null || n.childrens === undefined || n.childrens.length <= 0) {
          continue;
        }
        this.removeNode(n.childrens, id);
      }
    }
  }

  getNode(nodes, id) {
    const index = nodes.findIndex(n => {
      return n.id === id;
    });
    if (index > -1) {
      return nodes[index];
    } else {
      for (const n of nodes) {
        if (n.childrens === null || n.childrens === undefined || n.childrens.length <= 0) {
          continue;
        }
        return this.getNode(n.childrens, id);
      }
      return null;
    }
  }

  addNode(nodes, id, node) {
    const index = nodes.findIndex(n => {
      return n.id === id;
    });
    if (index > -1) {
      Array.prototype.splice.call(nodes[index].childrens, nodes[index].childrens.length + 1, 0, node);
    } else {
      for (const n of nodes) {
        if (n.childrens === null || n.childrens === undefined || n.childrens.length <= 0) {
          continue;
        }
        this.addNode(n.childrens, id, node);
      }
    }
  }

  ngOnDestroy(): void {
    for (const subscribe of this.subscribeArr) {
      subscribe.unsubscribe();
    }
  }

}

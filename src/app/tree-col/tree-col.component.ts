import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Col, ColType, TreeNode} from '../TreeNode';
import {DynamicComponentDirective} from '../directive/dynamic-component.directive';
import {IndexComponent} from '../cols/index.component';
import {DefaultComponent} from '../cols/default.component';
import {InputComponent} from '../cols/input.component';
import {SelectComponent} from '../cols/select.component';
import {CheckboxComponent} from '../cols/checkbox.component';
import {TitleComponent} from '../cols/title.component';
import {OprComponent} from '../cols/opr.component';

@Component({
  selector: 'app-tree-col',
  templateUrl: './tree-col.component.html',
  styleUrls: ['./tree-col.component.css']
})
export class TreeColComponent implements OnInit {

  @Input() col: Col;
  @Input() row: TreeNode;
  @Input() hasChilderen: boolean = false;
  @Input() colNumber: number;


  @ViewChild(DynamicComponentDirective) ad: DynamicComponentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent(this.col);
  }


  loadComponent(c) {
    let componentFactory;

    switch (c.colType) {
      case ColType.INDEX:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(IndexComponent);
        break;
      case ColType.DEFAULT:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(DefaultComponent);
        break;
      case ColType.INPUT:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(InputComponent);
        break;
      case ColType.SELECT:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(SelectComponent);
        break;
      case ColType.CHECKBOX:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(CheckboxComponent);
        break;
      case ColType.OPR:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(OprComponent);
        break;
      case ColType.TITLE:
        componentFactory = this.componentFactoryResolver.resolveComponentFactory(TitleComponent);
        break;
      default:
        throw new Error('>>>>>>>>>>>> ERROR ERROR ERROR');
    }

    let viewContainerRef = this.ad.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.instance['col'] = c as any;
    componentRef.instance['row'] = this.row;
    componentRef.instance['colNumber'] = this.colNumber;

    for (const prop in componentRef.instance) {
      if (componentRef.instance[prop] instanceof EventEmitter) {

      }
      if (prop === 'col') {

      }
      if (prop === 'hasChilderen') {
        componentRef.instance['hasChilderen'] = this.hasChilderen;
      }
    }
  }
}

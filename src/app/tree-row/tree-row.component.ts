import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {OprType, TreeNode} from '../TreeNode';


@Component({
  selector: 'app-tree-row',
  templateUrl: './tree-row.component.html',
  styleUrls: ['./tree-row.component.css']
})
export class TreeRowComponent implements AfterViewInit, OnInit, OnChanges {

  @Input() node: TreeNode;
  @Input() colNumber: number;

  clazz = 'col-md-' + this.colNumber + ' branch expanded';

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.clazz = 'col-md-' + this.colNumber + ' branch expanded';
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}

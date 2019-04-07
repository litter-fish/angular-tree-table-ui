import {Component} from '@angular/core';
import {Col, ColEvent, ColType, EventType, InputData, OprType, SelectData, TreeNode} from './TreeNode';
import {EventService, EventServiceType} from './service/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(public eventService: EventService) {}

  nodes: TreeNode[] =
    [
    new TreeNode('0', [
      [new Col('0-1', '序 列 号', ColType.TITLE, null, [], 'col-md-3')],
      [new Col('0-2', '显示名称', ColType.TITLE, null, [], 'col-md-4')],
      [new Col('0-3', '描   述', ColType.TITLE, null, [], 'col-md-2')],
      [new Col('0-4', '操   作', ColType.TITLE, null, [], 'col-md-3')],
    ], []),
    new TreeNode('1', [
      [new Col('1-1-1', '1-1-1', ColType.INDEX, null, [new ColEvent(EventType.CLICK, (id) => {
        //alert('hhahahaha');

      })])],
      [new Col('1-1-2', '1-1-2-999999999999999999999', ColType.DEFAULT, null, [new ColEvent(EventType.CLICK, (id) => {
        //alert('ok');
      })])],
      [new Col('1-1-3', '1-1-3', ColType.DEFAULT)],
      [new Col('1-1-4', '', ColType.OPR, null, [
          new ColEvent(OprType.ADD, (id) => {
            this.eventService.bindEvent(new EventServiceType(OprType.ADD, {id: id, node: new TreeNode('999', [
                [new Col('999', '999', ColType.INDEX)],
                [new Col('999', '999', ColType.DEFAULT)],
                [new Col('1-1-3', '1-1-3', ColType.DEFAULT)],
                [new Col('999', '999', ColType.OPR, null, [
                    new ColEvent(OprType.ADD, (id) => {alert('add');}),
                    new ColEvent(OprType.REMOVE, (id) => {alert('remove');}),
                    new ColEvent(OprType.MODIFY, (id) => {alert('MODIFY');})
                  ]
                )]
              ], [])}
            ));
          }),
          new ColEvent(OprType.REMOVE, (id) => {alert('remove');}),
          new ColEvent(OprType.MODIFY, (id) => {alert('MODIFY');})
        ]
      )]
    ], [
      new TreeNode('1-2', [
        [new Col('1-2-1', '1-2-1', ColType.INDEX)],
        [new Col('1-2-1', '1-2-1', ColType.INPUT, new InputData('1'), [new ColEvent(EventType.BLUR, () => {
          console.log('blur');
        })])],
        [new Col('1-1-3', '1-1-3', ColType.DEFAULT)],
        [new Col('1-2-1', '', ColType.OPR, null, [
            new ColEvent(OprType.ADD, (id) => {alert('add');}),
            new ColEvent(OprType.REMOVE, (id) => {alert('remove');})
          ]
        )]
      ], [
        new TreeNode('1-2-1', [
          [new Col('1-2-1-1', '1-2-1-1', ColType.INDEX)],
          [new Col('1-2-1-2', '1-2-1-2', ColType.DEFAULT)],
          [new Col('1-1-3', '1-1-3', ColType.DEFAULT)],
          [new Col('1-2-1-3', '', ColType.OPR, null, [
              new ColEvent(OprType.ADD, (id) => {alert('add');}),
              new ColEvent(OprType.REMOVE, (id) => {alert('remove');})
            ]
          )]
        ], [])
      ])
    ]),

    new TreeNode('2',
      [
        [new Col('2-1-1', '2-1-1', ColType.INDEX)],
        [new Col('2-1-2', '2-1-2', ColType.DEFAULT)],
        [new Col('2-1-3', '', ColType.CHECKBOX, new InputData(1),
          [new ColEvent(EventType.CLICK, (col:Col, row:TreeNode) => {
            console.log(row);
            row.cols[2][1].colEvent = [new ColEvent(EventType.CLICK, () => {
              console.log('hhhhhhhh');
            })];
          })]),
            new Col('2-1-2', '2-1-2', ColType.DEFAULT)],
        [new Col('2-1-4', '2-1-4', ColType.OPR)]
      ],
      [
        new TreeNode('2-2',
          [
              [new Col('2-2-1', '2-2-1', ColType.INDEX)],
              [new Col('2-2-2', '2-2-2', ColType.SELECT,
                new SelectData('1',
                [{value: '1', label: '111111111111'}, {value: '2', label: '222222222'}]),
                [new ColEvent(EventType.CHANGE, (col:Col, row:TreeNode) => {
                  console.log(event.currentTarget['value']);
                  row.cols[0][0].label = 'tttttt';
                  col.data = new SelectData('2', [{value: '1', label: '111111111111'}, {value: '2', label: '222222222'}, {value: '3', label: '333333'}, {value: '5', label: '5555555'}]);
                })])
              ],
              [new Col('2-2-3', '2-2-3', ColType.DEFAULT)],
              [new Col('2-2-4', '2-2-4', ColType.OPR)]

          /*[new Col('2-2-1', '2-2-1', ColType.CHECKBOX, new InputData(1))], [
            new TreeNode('2-2-1', [
            [new Col('2-2-1-1', '2-2-1-1', ColType.INDEX)],
            [new Col('2-2-1-2', '2-2-1-2', ColType.SELECT, new SelectData('',
              [{value: '1', label: '111111111111'}, {value: '2', label: '222222222'}]),
              [new ColEvent(EventType.CHANGE, () => {console.log('change');})]
            )])
        ])*/
          ],
          [])]
      )
  ];
}

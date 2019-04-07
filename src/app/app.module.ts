import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TreeNodeComponent} from './tree-node/tree-node.component';
import {TreeRowComponent} from './tree-row/tree-row.component';
import {TreeColComponent} from './tree-col/tree-col.component';
import {DynamicComponentDirective} from './directive/dynamic-component.directive';
import {IndexComponent} from './cols/index.component';
import {DefaultComponent} from './cols/default.component';
import {InputComponent} from './cols/input.component';
import {SelectComponent} from './cols/select.component';
import {CheckboxComponent} from './cols/checkbox.component';
import {TitleComponent} from './cols/title.component';
import {OprComponent} from './cols/opr.component';
import {EventService} from './service/event.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TreeNodeComponent,
    TreeRowComponent,
    TreeColComponent,
    DynamicComponentDirective,
    IndexComponent,
    DefaultComponent,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    TitleComponent,
    OprComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent],
  entryComponents: [
    IndexComponent,
    DefaultComponent,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    TitleComponent,
    OprComponent
  ]
})
export class AppModule { }

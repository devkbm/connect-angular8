import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFuncModule } from '../../common/common-func.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { BoardService } from './service/board.service';

import { BoardTreeComponent } from './component/board-tree.component';
import { BoardFormComponent } from './component/board-form.component';
import { ArticleFormComponent } from './component/article-form.component';
import { BoardComponent } from './component/board.component';
import { ArticleGridComponent } from './component/article-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../common/grid/renderer/button-renderer.component';
import { ArticleViewComponent } from './component/article-view.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    NgZorroAntdModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    CKEditorModule
  ],
  declarations: [
    ArticleViewComponent,
    BoardTreeComponent,
    BoardFormComponent,
    ArticleFormComponent,
    ArticleGridComponent,
    BoardComponent
  ],
  providers: [
    BoardService
  ],
  exports: [
    BoardFormComponent,
    BoardTreeComponent
  ]
})
export class BoardModule { }

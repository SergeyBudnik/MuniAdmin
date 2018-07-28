import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ColorPickerModule} from 'ngx-color-picker';
import {TagInputModule} from 'ngx-chips';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ToastModule} from 'ng2-toastr';
import {RouterModule, Routes} from '@angular/router';
import {MyDatePickerModule} from 'mydatepicker';
import {ArticlesListPageComponent} from './pages/articles-list/articles-list.page';
import {HeaderComponent} from './parts/header/header.component';
import {LoginPageComponent} from './pages/login/login.page';
import {LoginService} from './service';
import {LoginHttp} from './http';
import {CookieService} from 'angular2-cookie/core';

import 'rxjs/Rx';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ArticleService} from './service/article.service';
import {ArticleHttp} from './http/article.http';
import {ArticlePageComponent} from './pages/article/article.page';
import {QuillModule} from 'ngx-quill';
import {TextFieldControlComponent} from './parts/controls/text-field/text-field-control.component';
import {RichTextFieldControlComponent} from './parts/controls/rich-text-field/rich-text-field-control.component';
import {TagFieldControlComponent} from './parts/controls/tag-field/tag-field-control.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {FormImageFieldControlComponent} from './parts/controls/form-image-control/form-image-field.control';
import {ModalTemplateComponent} from './templates/modal/modal.template';
import {FormSelectControl} from './parts/controls/form-select-control/form-select.control';
import {AddArticleTranslationPopupComponent} from './parts/article/add-translation-popup/add-article-translation.popup';
import {DateFieldControlComponent} from './parts/controls/form-date-field/form-date-field.control';
import {FormTextAreaControlComponent} from './parts/controls/form-text-area-control/form-text-area.control';
import {ArticleLocalizationComponent} from './parts/article/localization/article-localization.component';
import {ReportsPageComponent} from './pages/reports/reports.page';
import {ReportsService} from './service/reports.service';
import {ReportsHttp} from './http/reports.http';
import {ReportPageComponent} from './pages/report/report.page';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },

  { path: 'articles', component: ArticlesListPageComponent },
  { path: 'articles/:id', component: ArticlePageComponent },

  { path: 'reports', component: ReportsPageComponent },
  { path: 'reports/:id', component: ReportPageComponent },

  { path: '**', component: ArticlesListPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,

    LoginPageComponent,
    ArticlePageComponent,
    ArticleLocalizationComponent,
    ArticlesListPageComponent,

    ReportsPageComponent,
    ReportPageComponent,

    DateFieldControlComponent,
    TagFieldControlComponent,
    TextFieldControlComponent,
    RichTextFieldControlComponent,
    FormImageFieldControlComponent,
    FormTextAreaControlComponent,

    ModalTemplateComponent,

    AddArticleTranslationPopupComponent,
    FormSelectControl
  ],
  imports: [
    TagInputModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true}),
    MyDatePickerModule,
    ImageCropperModule,
    QuillModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    CookieService,

    ArticleService,
    ReportsService,
    LoginService,

    ArticleHttp,
    ReportsHttp,
    LoginHttp
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

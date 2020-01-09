import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleComponent } from './articles-list/article/article.component';
import { ArticleService } from './shared/article.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

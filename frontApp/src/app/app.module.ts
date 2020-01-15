import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { HeaderComponent } from './header/header.component';
import { ArticleComponent } from './article-list/article/article.component';
import { ArticleService } from './shared/article.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { StatisticsService} from './shared/statistics.service';
import { StatisticsComponent } from './statistics/statistics.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    HeaderComponent,
    ArticleComponent,
    DropdownDirective,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    ],
  providers: [ArticleService,StatisticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

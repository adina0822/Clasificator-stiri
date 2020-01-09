import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles:Article[];
  constructor(private articleService:ArticleService) { }

  ngOnInit() {
    this.articles=this.articleService.getArticles();
  }

}

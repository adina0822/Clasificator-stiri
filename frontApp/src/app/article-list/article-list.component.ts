import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../shared/article.model';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articleList:Article[];
  selectedCategory:string;
  images: any= {
      Tech:"././assets/tech.jpg",
      Politics:"././assets/politics.jpg",
      Finance:"././assets/finance.jpg",
      Sports:"././assets/sport.jpg",
      Culture:"././assets/culture.jpg",
      Science:"././assets/science.jpg"
    };
  
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
      this.articleList=this.articleService.getArticles();
      this.selectedCategory=this.articleService.selectedCategory;
      this.articleService.listChanged.subscribe(
        (articles:Article[]) => {this.articleList=articles}
      )
      this.articleService.categoryChanged.subscribe(
        (category:string) => {this.selectedCategory=category}
      )
  }
  
}

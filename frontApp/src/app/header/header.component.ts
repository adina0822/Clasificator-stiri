import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private articleService:ArticleService) { }

  ngOnInit() {
  }

  onCategoryClicked(category:string){
    this.articleService.setCategory(category);
    this.articleService.categoryChanged.emit(this.articleService.getArtciles());
  }

}

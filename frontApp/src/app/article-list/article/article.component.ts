import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/shared/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article:Article;
  open:boolean=false;

  toggleOpen(){
    this.open=!this.open;
  }


  constructor() { }

  ngOnInit() {
  }

}

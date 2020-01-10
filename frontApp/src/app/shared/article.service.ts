import { Article } from './article.model';
import { EventEmitter } from '@angular/core';

export class ArticleService {
  categoryChanged = new EventEmitter<Article[]>();

  articlesList: Article[] = [
    {
    "id":20,
    "title":"Heeei",
    "body":"blah blah blah",
    "categories":["Tech","Politics"]
    },
    {
      "id":20,
      "title":"Heeei",
      "body":"Articles are words that define a noun as specific or unspecific. Consider the following examples: After the long day, the cup of tea tasted particularly good.By using the article the, we’ve shown that it was one specific day that was long and one specific cup of tea that tasted good.After a long day, a cup of tea tastes particularly good.By using the article a, we’ve created a general statement, implying that any cup of tea would taste good after any long day.",
      "categories":["Politics"]
      }

  ];
  private displayedArticles:Article[]=this.articlesList;
  selectedCategory:string;
  constructor() { }

  getArtciles(){
    return this.displayedArticles.slice();
  }

  setCategory(category:string) {
    
    this.displayedArticles=[];
    if(category==='All') this.displayedArticles=this.articlesList
    else{
      this.selectedCategory=category;
      for (let article of this.articlesList) {
        if (article.categories.includes(category))
        this.displayedArticles.push(article);
    }
    }
    
  }
}

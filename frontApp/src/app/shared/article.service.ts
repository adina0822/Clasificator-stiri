import { Article } from './article.model';
import { EventEmitter } from '@angular/core';

export class ArticleService {
  categoryChanged = new EventEmitter<Article[]>();

  articlesList: Article[] = [
    {
    "id":20,
    "title":"Heeei",
    "body":"It is a long established fact that aIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).ved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
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

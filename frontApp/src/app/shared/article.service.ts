import { Article } from './article.model';

export class ArticleService {

  constructor() { }

  private articles:Article[] =[
    {
      "id":20,
      "title":"Heeei",
      "body":"blah blah blah",
      "categories":["Tech","Politics"]
      },
      {
        "id":20,
        "title":"Heeei",
        "body":"blah blah blah",
        "categories":["Politics"]
        }
  ]

  getArticles(){
    return this.articles.slice();
  }
}

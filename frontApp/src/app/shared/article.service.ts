import { Article } from './article.model';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  listChanged = new EventEmitter<Article[]>();
  categoryChanged = new EventEmitter<string>();
  articlesList:Article[];


  constructor(private http: HttpClient){
    this.getArticlesHTTP();
  }

  
  private displayedArticles:Article[]=this.articlesList;
  selectedCategory:string='All';


  getArticles(){
    this.getArticlesHTTP()
    this.displayedArticles=this.articlesList;
    this.setCategory(this.selectedCategory);
    return this.displayedArticles.slice();
    
  }

  getArticlesHTTP() {
    this.http.get(`localhost:5000/articles`).subscribe(
      (data:Article[]) => this.articlesList=data,
    )
    }


  setCategory(category:string) {
    this.selectedCategory=category;
    this.displayedArticles=[];
    if(category==='All') this.displayedArticles=this.articlesList
    else{
      
      for (let article of this.articlesList) {
        if (article.category===category)
        this.displayedArticles.push(article);
    }
    } 
  }

  addArticle(article:NgForm):Observable<Article>{
    return this.http.post<Article>("localhost:5000/articles",article);
  }
}

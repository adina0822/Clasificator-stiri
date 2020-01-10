import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../shared/article.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from '../shared/article.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  addArticleForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,Validators.minLength(4)]),
    body: new FormControl('',[
      Validators.required,Validators.minLength(4)]),
  });
  constructor(private articleService:ArticleService) { }

  ngOnInit() {
  }

  onCategoryClicked(category:string){
    this.articleService.setCategory(category);
    this.articleService.listChanged.emit(this.articleService.getArtciles());
    this.articleService.categoryChanged.emit(this.articleService.selectedCategory);
  }

  addArticle(form: NgForm){
    console.log(this.addArticleForm.value);
    this.articleService.addArticle(new Article(this.addArticleForm.value.title,this.addArticleForm.value.body))
    this.articleService.listChanged.emit(this.articleService.getArtciles());

  }

}

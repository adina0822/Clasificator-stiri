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
      Validators.required]),
    body: new FormControl('',[
      Validators.required]),
    rep: new FormControl(),
    model: new FormControl()
  });
  constructor(private articleService:ArticleService) { }

  ngOnInit() {
  }

  onCategoryClicked(category:string){
    this.articleService.setCategory(category);
    this.articleService.listChanged.emit(this.articleService.getArticles());
    this.articleService.categoryChanged.emit(this.articleService.selectedCategory);
  }

  addArticle(form: NgForm){
    console.log(this.addArticleForm.value);
    this.articleService.addArticle(form)
      .subscribe((data) => {})
    this.articleService.listChanged.emit(this.articleService.getArticles());
    this.addArticleForm.setValue({title:'',body:'',rep:"",model:""})


  }

}

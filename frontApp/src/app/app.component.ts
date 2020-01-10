import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AI-front';
  category: string = "";
  @Output() onChangeCategory: EventEmitter<string> = new EventEmitter<string>();

  navbarOnclick(selectedCategory:string):void {
    this.category=selectedCategory;
  }
  
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-demo';
  actions :Array<any>=[
    {link:"/home",title:"Home",icon:"house"},
    {link:"/products",title:"Products",icon:"card-list"},
    {link:"/add-product",title:"Add Product",icon:"plus-square"},
  ];
  currentAction :any;

  setCurrentAction(action : any){
    this.currentAction = action;
  }
}

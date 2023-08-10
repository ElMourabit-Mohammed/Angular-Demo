import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Array<Product>=[];
  public keyword : string="";

  // products : Array<any> =[
  //   {id:1,name:"Computer",price:5500,checked:false},
  //   {id:2,name:"HeadPhones",price:100,checked:true},
  //   {id:3,name:"Keyboard",price:800,checked:true},
  //   {id:4,name:"Phone",price:3500,checked:false},
  //   {id:5,name:"Smart Watch",price:930,checked:false}
  // ];

  constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.getProducts()
  }


  /*
  pr$!: Observable<Array<Product>>;
  getProducts(){
    this.pr$ = this.productService.getProducts()
  }

  et dans la partie html on change *ngFor="let product of products$ | async"
  */
  getProducts(){
    this.productService.getProducts(1,3)
    .subscribe({
      next : data =>{
        this.products = data
      },
      error : err =>{
        console.log(err)
      }
    })
  }

  handleCheckProduct(product:Product){
    this.productService.updateCheckProduct(product)
    .subscribe({
      next : updatedProduct =>{
        product.checked = !product.checked;
      },
      error : err =>{
        console.log(err)
      }
    })
  }

  handleDeleteProduct(product:Product){
    if(confirm("Are you sure?"))
    this.productService.deleteProduct(product)
    .subscribe({
      next : deletedProduct => {
        //pour actualiser la partie front-end apres la suppression
        //this.getProducts()
        //mais on peut faire mieux
        this.products = this.products.filter(p=>p.id != product.id);
      },
      error : err => {
        console.log(err)
      }
    })
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next : value => {
        this.products=value;
      }
    })
  }
}

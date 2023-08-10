import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm! : FormGroup;

  constructor(private formBuilder:FormBuilder,private productService:ProductService){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name : this.formBuilder.control('',[Validators.required,Validators.minLength(4)]),
      price : this.formBuilder.control(0,),
      checked : this.formBuilder.control(false)
    })
  }

  saveProduct() {
    let product:Product=this.productForm.value;
    console.log(product)
    this.productService.saveProduct(product).subscribe({
      next : data => {
        alert(JSON.stringify(data));
      }, error :err => {
        console.log(err);
      }
    });
  }

}

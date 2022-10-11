import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  productList!: any[];
  products: any[] = [];
  subtotal!: any;
  categories: any[] = [];

  constructor(private productService : ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (res:any) =>{
        console.log(res);
        this.productList = res
      },
      error: (error) => {
        console.log('Request Completed');
      }
    });

    this.productService.loadCart();
    this.products = this.productService.getProduct()
  }


  //Add product to cart
  addToCart(product:any){
    if(!this.productService.productInCart(product)){
      product.quantity = 1;
      this.productService.addToCart(product);
      this.products = [...this.productService.getProduct()];
      this.subtotal = product.price
    }
  }

  productsCount(){
    return this.products.length;
  }

  // Change subtotal
  /*changeSubtotal(product: any, index: any){
    const quantity = product.quantity;
    const amount = product.price;

    this.subtotal = amount * quantity;

    this.productService.saveCart();
  }*/

  //Remove from cart
  removeFromCart(product: any){
    this.productService.removeProduct(product);
    this.products = this.productService.getProduct()
  }

  //Calculate total 
  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

  //Checkout
  checkout(){
    localStorage.setItem('cartTotal', JSON.stringify(this.total));
    this.router.navigate(['/payment']);
  }
}

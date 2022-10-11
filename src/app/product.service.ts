import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any[] = [];

  constructor(private http: HttpClient) { }

  // Get all products
  getAllProducts() {
    return this.http.get('assets/products.json');
  }

  // Get product
  getProduct(){
    return this.products;
  }
  
  // Save cart
  saveCart(){
    localStorage.setItem('cartItems', JSON.stringify(this.products))
  }

  //Add to cart
  addToCart(addedProduct : any){
    this.products.push(addedProduct);
    this.saveCart();
  }

  //Load shopping cart
  loadCart(){
    this.products = JSON.parse(localStorage.getItem('cartItems') as any ) || [];
  }

  //Find products in cart
  productInCart(product: any){
    return this.products.findIndex((a: any)=> a.id === product.id) > -1;
  }

  //Remove product
  removeProduct(product: any){
    const index = this.products.findIndex((a:any) => a.id === product.id)

    if (index > -1){
      this.products.splice(index, 1);
      this.saveCart()
    }
  }

  //Clear cart items
  clearProducts() {
    localStorage.clear()
  }

}

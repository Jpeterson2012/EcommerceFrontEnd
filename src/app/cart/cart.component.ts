import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { ImageService } from '../Services/image.service';
import { books } from '../Models/books';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(public cartService: CartService,private imageService: ImageService,@Inject('Window') window: Window){}

  public products: any = [];
  public grandTotal!: string;
  

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(v=>{      
      this.products = v;
      this.grandTotal = this.cartService.getTotalPrice(this.products).toFixed(2);
    })
  }
  getViewWidth(){
    console.log(window.innerWidth)
    return window.innerWidth
  }

  removeItem(item:any){
    this.cartService.removeCartItem(item);
  }
  emptyCart(){
    this.cartService.removeAllCart();
  }
  onImageLoad(evt:any) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;      
      width < 2 && (evt.target.src = '../../assets/stock.jpg')     
    }
  }
  emitImage(book: books){
    return this.imageService.getBook(book.name);
  }
  
  totalMult(book :any){
    return (book.quantity * book.price).toFixed(2);
  }
  onAddQuantity(book: any){
    this.cartService.addToCart(book);
  }
  onRemoveQuantity(book: any){
    this.cartService.removeQuantity(book);
  }
  

  
}

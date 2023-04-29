import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { books } from '../Models/books';
import { ImageService } from '../Services/image.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  constructor(private cartService: CartService, private imageService: ImageService){}

  public products: any = [];
  public grandTotal!: string;

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(v=>{
      this.products = v;
      this.grandTotal = this.cartService.getTotalPrice(this.products).toFixed(2);
    })
  }

  emitImage(book: books){
    return this.imageService.getBook(book.name);
  }
  removeItem(item:any){
    this.cartService.removeCartItem(item);
  }

}

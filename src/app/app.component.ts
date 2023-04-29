import { Component, OnDestroy, OnInit } from '@angular/core';
import { DBService } from './Services/db.service';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DBService]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private db: DBService,private cartService: CartService){}

  public totalItem: number = 0;
  ngOnInit(): void {
    // this.cartService.getProducts().subscribe(res=>{
    //   this.totalItem = res.length;
    // })
    this.cartService.currQuantity.subscribe(data=>{
      this.totalItem = data;
    })
  }

  title = 'TheBookShop';
  sitename: string = 'TheBookShop';

  counter: number = 0;

  


  ngOnDestroy(): void {
    this.cartService.currQuantity.unsubscribe;
  }
}

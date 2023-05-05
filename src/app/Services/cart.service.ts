import { EventEmitter, Injectable } from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    public productList = new BehaviorSubject<any>([]);

    constructor(private _snackBar: MatSnackBar){}

    getProducts(){
        return this.productList.asObservable();
    }
    setProduct(product: any){
        // this.cartItemList.push(...product);
        this.productList.next(product);
    }
    
    addToCart(product: any){
        const items =[...this.productList.value];

        const itemInCart = items.find((_item) => _item.id===product.id);

        if(itemInCart){
            itemInCart.quantity += 1;
        }
        else {
            items.push(product);
        }
        this.productList.next(items);    
        this.currentTotal();
        this._snackBar.open('1 item added to cart','Okay',{duration: 3000}); //first param: message displayed in popup, 2nd message in button, 3rd duration of popup
    }
    
    getTotalPrice(items: Array<any>): number{
        return items.map((item)=>item.price * item.quantity)
        .reduce((prev,current) => prev + current, 0);
    }

    removeCartItem(product: any, update = true): Array<any> {
        const filteredItems = this.productList.value.filter((_item: any) => _item.id !== product.id);
        
        if(update){
        this.productList.next(filteredItems);
        this.currentTotal();
        this._snackBar.open('1 item removed from cart','Okay',{duration: 3000})
        }
        
        return filteredItems;
    }

    removeAllCart(){
        this.productList.next([]);
        this.currentTotal();
        this._snackBar.open('Cart is cleared', 'Okay', {duration: 3000})
    }
    
    currQuantity = new EventEmitter<number>();
    currentTotal(){
        const items =[...this.productList.value];
        let val = 0;
        val = items.map((item)=>item.quantity).reduce((prev,current)=>prev + current, 0);
        this.currQuantity.emit(val);
    }
    removeQuantity(product: any): void{
        let itemForRemoval: any | undefined;
        let filteredItems = this.productList.value.map((_item: any)=>{
            if(_item.id === product.id){
                _item.quantity--;
            }
            if(_item.quantity === 0){
                itemForRemoval = _item;
            }
            return _item;
        })
        if (itemForRemoval){
            filteredItems = this.removeCartItem(itemForRemoval, false);
            this.currentTotal();
        }
        this.productList.next(filteredItems);
        this.currentTotal();   
        this._snackBar.open('1 item removed from cart','Okay',{duration: 3000})
    }

    
}
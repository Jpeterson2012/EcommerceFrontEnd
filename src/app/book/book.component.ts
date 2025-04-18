import { Component, ContentChild, ElementRef, ViewChild, Input } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  constructor(private cartService: CartService,private modalService: NgbModal){}

  @Input() book: any;
  @Input() i: any
  @Input() radioButton: any
  @Input() searchText: any

  @ContentChild('content') content?: ElementRef;
    openLg(content: any) {
      console.log('hello')
      this.modalService.open(content, { size: 'lg' });
    }
  @ViewChild('details') private detailsComponent: DetailsComponent | undefined
      async openModal(book: any){
        return await this.detailsComponent!.openScrollableContent(book)
    }      

  returnAvail(book: any){
    if (book.qty === '0')
    {
      return 'UnAvailable';
    }
    else{return 'Available'}
  }

  
  //Cart Functionality///////////////////////////////
  addToCart(item: any){
    this.cartService.addToCart(item);
  }
  ///////////////////////////////////////////////////
  
  onImageLoad(evt:any) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;      
      width < 2 && (evt.target.src = '../../assets/bookcoffee.jpg')     
    }    
  }

  heartAnimation(heartID: any,bookID: any){
    // console.log(id)
    // console.log(book)
    let temp = sessionStorage.getItem("favorites") ? JSON.parse(sessionStorage.getItem("favorites")!) : {}
    temp[bookID] ? delete temp[bookID] : temp[bookID] = true
    sessionStorage.setItem("favorites",JSON.stringify(temp))
    document.getElementById(heartID)!.classList.toggle("is-active")        
  }
  //Get favorites from session storage
  getFavorites(bookID: any){
    let temp = JSON.parse(sessionStorage.getItem("favorites")!)
    if (!temp) return false

    if (temp[bookID]) return true
    else return false
  }

}

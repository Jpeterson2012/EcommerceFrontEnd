import { Component, ContentChild, ElementRef, ViewChild, Input } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../details/details.component';
import { StorageService } from '../authentication/Services/storage.service';
import { DBService } from '../Services/db.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  constructor(private cartService: CartService,private modalService: NgbModal, private storageService: StorageService, private dbService: DBService){}

  @Input() book: any;
  @Input() i: any
  @Input() radioButton: any
  @Input() searchText: any

  @ContentChild('content') content?: ElementRef;
    openLg(content: any) {      
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
      width < 2 && (evt.target.src = '../../assets/stock.jpg')     
    }    
  }

  heartAnimation(heartID: any,bookID: any){
    // console.log(id)
    // console.log(book)
    let logged = this.storageService.isLoggedIn()
    let user = this.storageService.getUser()
    let temp = sessionStorage.getItem("favorites") ? JSON.parse(sessionStorage.getItem("favorites")!) : {}      
    let temp2 = sessionStorage.getItem("fbooks") ? JSON.parse(sessionStorage.getItem("fbooks")!) : {}

    if (temp[bookID.id]){      
      delete temp[bookID.id];
      logged && (delete temp2[bookID.id], this.dbService.deleteFavorites(user.id,bookID.id).subscribe({
          error: err => {
            console.log(err.error.message);
            temp[bookID.id] = true
            temp2[bookID.id] = bookID
          }
        })
      )
    }
    else{
      temp[bookID.id] = true;
      logged && (temp2[bookID.id] = bookID, this.dbService.addFavorites(user.id,bookID.id).subscribe({
          error: err => {
            console.log(err.error.message);
            delete temp[bookID.id]
            delete temp2[bookID.id]
          }
        })
      )
    }
    sessionStorage.setItem("favorites",JSON.stringify(temp))
    sessionStorage.setItem("fbooks", JSON.stringify(temp2))
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

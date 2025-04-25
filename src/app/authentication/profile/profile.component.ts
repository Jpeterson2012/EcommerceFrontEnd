import { Component, OnInit, ContentChild, ElementRef } from '@angular/core';
import { StorageService } from '../Services/storage.service';
import { UserService } from '../Services/user.service';
import { DBService } from 'src/app/Services/db.service';
import { CartService } from 'src/app/Services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private modalService: NgbModal, private cartService: CartService,  private storageService: StorageService, private userService: UserService, private dbService: DBService) { }

  books: any = []
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();    
    let temp = JSON.parse(sessionStorage.getItem("favorites")!)
    temp = Object.keys(temp)    
    if (temp.length > 0){      
      this.dbService.getUserBooks(temp).subscribe(v => {console.log(v),this.books = v})
    }
  }

  @ContentChild('content') content?: ElementRef;
      openLg(content: any) {
        console.log('hello')
        this.modalService.open(content, { size: 'lg' });
  }

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

    if (temp[bookID]){      
      delete temp[bookID];
      logged && this.dbService.deleteFavorites(user.id,bookID).subscribe({
        error: err => {
          console.log(err.error.message);
          temp[bookID] = true
        }
      });
    }
    else{
      temp[bookID] = true;
      logged && this.dbService.addFavorites(user.id,bookID).subscribe({
        error: err => {
          console.log(err.error.message);
          delete temp[bookID]
        }
      });
    }
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
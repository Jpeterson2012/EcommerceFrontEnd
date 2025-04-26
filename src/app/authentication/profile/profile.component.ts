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
  chunk: any = []
  ngOnInit(): void {

    this.currentUser = this.storageService.getUser();    
    let temp = JSON.parse(sessionStorage.getItem("favorites")!)
    let temp2: any = {}
    temp = Object.keys(temp)      

    if (temp.length > 0){      

      sessionStorage.getItem("fbooks") && ( this.books = Object.values(JSON.parse(sessionStorage.getItem("fbooks")!)), this.chunk = this.displayWrap() )
      // this.dbService.getUserBooks(temp).subscribe(v => {
      //   // console.log(v),
      //   this.books = v,
      //   this.books.forEach((a:any)=>{
      //      Object.assign(a,{quantity:1,total:a.price});
      //      temp2[a.id] = a
      //   }),

      //   sessionStorage.setItem("fbooks",JSON.stringify(temp2))
      //   this.chunk = this.displayWrap()
      // })
    }
  }

  @ContentChild('content') content?: ElementRef;
      openLg(content: any) {        
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

  deleteAccount(){
    window.alert("Sorry, you're not allowed to leave us just yet...")
  }

  getViewWidth(){
    return window.innerWidth
  }

  displayWrap(){
    const chunkedArray = [];
    for (let i = 0; i < this.books.length; i += 10) {
      chunkedArray.push(this.books.slice(i, i + 10));
    }    
    return chunkedArray
  }
  
}
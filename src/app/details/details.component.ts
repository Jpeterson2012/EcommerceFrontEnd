import { Component, Injectable, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { DBService } from '../Services/db.service';
import { CartService } from '../Services/cart.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
@Injectable()
export class DetailsComponent implements OnInit {

  constructor(private db: DBService,private modalService: NgbModal, private cartService: CartService){}

  ngOnInit(): void { }

  book: any
  @ViewChild('details') private detailsContent: TemplateRef<DetailsComponent> | undefined
  private modalRef: NgbModalRef | undefined


  bookDes = ''
  bookLink = ''
  bookLink2 = ''
    
  async openScrollableContent(book: any) {
    this.modalRef = this.modalService.open(this.detailsContent, { scrollable: true });             
    this.book = book    
    this.book.quantity = 1    

    let bookMetaData = await this.db.bookDesc(book.isbn)
    let temp: any

    bookMetaData.subscribe(v => {temp = v})        
    if (temp.openLibrary === "No description found"){      
      this.bookLink = temp.google.totalItems = 'Sorry, No Description Found'
      this.bookDes = temp.google.totalItems = 'Sorry, No Description Found'
    }
    else{
    this.bookLink2 = temp.openLibrary.key === undefined ? '' : "https://openlibrary.org/" + temp.openLibrary.key
    this.bookLink = temp.google.totalItems === 0 ? '' : temp.google.items[0]!.volumeInfo.canonicalVolumeLink
    this.bookDes = temp.google.totalItems === 0 ? 'Sorry, No Description Found' :temp.google.items[0]!.volumeInfo.description
    }

    //this.modalRef.result.then()

  }
  
  async close(){
    this.bookDes = ''
    this.bookLink = ''
    this.bookLink2 = ''
    this.modalRef!.close()
  }

  async dismiss(){
    this.bookDes = ''
    this.bookLink = ''
    this.bookLink2 = ''
    this.modalRef!.dismiss()
  }

  onImageLoad(evt:any) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;      
      width < 2 && (evt.target.src = '../../assets/bookcoffee.jpg')     
    }    
  }
  addToCart(item: any){  
    this.cartService.addToCart(item);
  }
}

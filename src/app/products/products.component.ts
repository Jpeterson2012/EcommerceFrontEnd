import { Component, ContentChild, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { books } from '../Models/books';
import { DBService } from '../Services/db.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../Services/cart.service';
import { ImageService } from '../Services/image.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, OnDestroy{

  constructor(private db: DBService,private modalService: NgbModal,private cartService: CartService,private imageService: ImageService){}

  ngOnInit(): void {
    //http get request
    this.db.getBooks().subscribe(v=>{
      this.books = v;
      this.books.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      })
    })
  }

  //Modal pop up functionality///////////////////////////
  @ContentChild('content') content?: ElementRef;
  openLg(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}
  @ContentChild('longContent') longContent?: ElementRef
  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
	}
  ////////////////////////////////////////////////////


  //Products display functionality///////////////////
  books = new Array<any>();
  
  // emitImage(book: books){
  //   for (let pic of this.bookPics){
  //     if (book.name === pic.name){
  //       return pic.image;
  //     }
  //   }
  //   return '../../bookcoffee.jpg';
  // }
  emitImage(book: books){
    return this.imageService.getBook(book.name);
  }

  
  ///////////////////////////////////////////////



  //Radio filter functionality///////////////////
  returnAllProd(){
    return this.books.length;
  }
  returnAvailProd(){
    return this.books.filter(book => book.qty != '0').length;
  }
  returnUnavailProd(){
    return this.books.filter(book => book.qty === '0').length;
  }
  
  productsCountRadioButton: string = 'All';
  onFilterRadioButtonChanged(data: string){
    this.productsCountRadioButton = data;
  }

  returnAvail(book: books){
    if (book.qty === '0')
    {
      return 'UnAvailable';
    }
    else{return 'Available'}
  }
  ////////////////////////////////////////////////////


  //Search functionality//////////////////////////////
  searchText: string = '';
  onSearchTextEntered(data: string){
    this.searchText = data;
  }
  ////////////////////////////////////////////////////


  //Cart Functionality///////////////////////////////
  addToCart(item: any){
    this.cartService.addToCart(item);
  }
  ///////////////////////////////////////////////////


  ngOnDestroy(): void {
    
  }
}

  


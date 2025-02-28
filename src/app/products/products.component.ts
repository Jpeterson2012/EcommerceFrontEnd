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

  available?: any;
  unvailable?: any;

  books: any[] = []
  currentPage = 1
  pageSize = 50
  totalItems = 0
  cachedData: any[] = []

  loadData(){    
    if (this.cachedData.length !== 0 && this.cachedData[0].size === this.pageSize && this.cachedData[0].page === this.currentPage){
      console.log('cached')
      this.books = this.cachedData[0].books
      this.currentPage = this.cachedData[0].page
      this.pageSize = this.cachedData[0].size
    }
    else{
      console.log('not cached')
      this.db.getBooks((this.currentPage - 1) * this.pageSize,this.pageSize)
      .subscribe(response => {
        this.books = response
        this.books.forEach((a:any)=>{
        Object.assign(a,{quantity:1});
        })
      })
    }
  }
  

  ngOnInit(): void {
    this.db.getTotalBooks().subscribe(v => {this.totalItems = v,console.log(v)})
    this.loadData()
    //http get request
    // this.db.getBooks().subscribe(v=>{
    //   this.books = v;
    //   this.books.forEach((a:any)=>{
    //     Object.assign(a,{quantity:1,total:a.price});
    //   })
    // })
  }
  onPageChange(pageNumber: any){    
    this.cachedData.length === 2 ? this.cachedData.shift() : null
    this.cachedData.push({"page": this.currentPage, "size": this.pageSize, "books": this.books})    

    this.currentPage = pageNumber.pageIndex + 1
    this.pageSize = pageNumber.pageSize
    this.loadData()
  }

  //Modal pop up functionality///////////////////////////
  @ContentChild('content') content?: ElementRef;
  openLg(content: any) {
    console.log('hello')
		this.modalService.open(content, { size: 'lg' });
	}

  bookDes = ''
  bookLink = ''
  //https://openlibrary.org/isbn/01951534481.json
  async fetchDesc(isbn: string){
    try{
      const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      const data = await resp.json()
      return data
    }
    catch (error) {console.error(error)}
  }
  @ContentChild('longContent') longContent?: ElementRef
  async openScrollableContent(longContent: any,isbn: string) {
		this.modalService.open(longContent, { scrollable: true });           
    let temp = await this.fetchDesc(isbn)
    console.log(temp)
    this.bookLink = temp.totalItems === 0 ? '' : temp.items[0]!.volumeInfo.canonicalVolumeLink
    this.bookDes = temp.totalItems === 0 ? 'Sorry, No Description Found' :temp.items[0]!.volumeInfo.description
	}
  ////////////////////////////////////////////////////


  //Products display functionality///////////////////  
  
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

  returnAvail(book: any){
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
  
  onImageLoad(evt:any) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;      
      width < 2 && (evt.target.src = '../../assets/bookcoffee.jpg')     
    }
  }

  ngOnDestroy(): void {}
}

  


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
		this.modalService.open(content, { size: 'lg' });
	}
  @ContentChild('longContent') longContent?: ElementRef
  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
	}
  ////////////////////////////////////////////////////


  //Products display functionality///////////////////
  // books = new Array<any>();
  
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

  ngOnDestroy(): void {
    
  }
}

  


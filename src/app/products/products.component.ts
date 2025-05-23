import { Component, ContentChild, ElementRef, OnDestroy, OnInit, Inject, Output, ViewChild, EventEmitter } from '@angular/core';
import { books } from '../Models/books';
import { DBService } from '../Services/db.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../Services/cart.service';
import { ImageService } from '../Services/image.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, OnDestroy{
  
  constructor(private db: DBService,
    private modalService: NgbModal,
    private cartService: CartService,
    private imageService: ImageService,
     @Inject('Window') window: Window){
      window.addEventListener('scroll', function(){
        let mybutton = document.getElementById('scrollButton')!
  
        if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
          mybutton ? mybutton.style.display = "block" : null
        } else {
          mybutton ? mybutton.style.display = "none" : null
        }
      })
    }       

  //Mat select variables
  pageIndex: number = 0;    
  goTo: number = 0;
  pageNumbers: number[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @Output() page = new EventEmitter<PageEvent>();
  /////////////////////
    
  available?: any;
  unvailable?: any;

  books: any[] = []
  currentPage = 1
  pageSize = 50
  totalItems = 0
  cachedData: any[] = []  
  getViewWidth(){
    return window.innerWidth
  }

  loadData(){    
    if (this.cachedData.length !== 0 && this.cachedData[0].size === this.pageSize && this.cachedData[0].page === this.currentPage){
      // console.log('cached')
      this.books = this.cachedData[0].books
      this.currentPage = this.cachedData[0].page
      this.pageSize = this.cachedData[0].size
    }
    else{
      // console.log('not cached')
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
    this.db.getTotalBooks().subscribe(v => {this.totalItems = v,this.updateGoto()})
    this.loadData()        
  }  

  

  bookDes = ''
  bookLink = ''
  bookLink2 = ''
  
  @ContentChild('longContent') longContent?: ElementRef
  async openScrollableContent(longContent: any,isbn: string) {
    console.log(this.getViewWidth())
		this.modalService.open(longContent, { scrollable: true });           

    let bookMetaData = await this.db.bookDesc(isbn)
    let temp: any

    bookMetaData.subscribe(v => {temp = v})        
    this.bookLink2 = temp.openLibrary.key === undefined ? '' : "https://openlibrary.org/" + temp.openLibrary.key
    this.bookLink = temp.google.totalItems === 0 ? '' : temp.google.items[0]!.volumeInfo.canonicalVolumeLink
    this.bookDes = temp.google.totalItems === 0 ? 'Sorry, No Description Found' :temp.google.items[0]!.volumeInfo.description
	}
  ////////////////////////////////////////////////////


  //Products display functionality///////////////////  
  
  emitImage(book: books){
    return this.imageService.getBook(book.name);
  }  
  ///////////////////////////////////////////////

  //Radio filter functionality///////////////////
  returnAllProd(){
    return this.books.filter(book => book.name?.toLowerCase().includes(this.searchText) || book.auth?.toLowerCase().includes(this.searchText)).length;
  }
  returnAvailProd(){
    return this.books.filter(book => book.name?.toLowerCase().includes(this.searchText) || book.auth?.toLowerCase().includes(this.searchText)).filter(book => book.qty != '0').length;
  }
  returnUnavailProd(){    
    return this.books.filter(book => book.name?.toLowerCase().includes(this.searchText) || book.auth?.toLowerCase().includes(this.searchText)).filter(book => book.qty === '0').length;        
  }
  
  productsCountRadioButton: string = 'All';
  onFilterRadioButtonChanged(data: string){
    this.productsCountRadioButton = data;
  }
  productsCount(){
    return this.productsCountRadioButton
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
  onSearch(){
    return this.searchText
  }
  ////////////////////////////////////////////////////


 //Function thats called when top button is clicked
  jumpToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  

  //Page change event using arrows
  onPageChange(pageNumber: any){    
    this.cachedData.length === 2 ? this.cachedData.shift() : null
    this.cachedData.push({"page": this.currentPage, "size": this.pageSize, "books": this.books})    

    this.currentPage = pageNumber.pageIndex + 1
    this.updateGoto()
    this.pageSize = pageNumber.pageSize
    this.loadData()
    this.jumpToTop()
  }
  
  //Page change events using mat select field
  updateGoto() {
    this.goTo = this.currentPage;
    this.pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.totalItems / this.pageSize); i++) {
      this.pageNumbers.push(i);
    }    
  }

  paginationChange(pageEvt: PageEvent) {
    this.totalItems = pageEvt.length;
    this.pageIndex = pageEvt.pageIndex;
    this.pageSize = pageEvt.pageSize;
    this.updateGoto();
    this.emitPageEvent(pageEvt);
  }

  goToChange() {
    this.paginator!.pageIndex = this.goTo - 1;
    const event: PageEvent = {
      length: this.paginator!.length,
      pageIndex: this.paginator!.pageIndex,
      pageSize: this.paginator!.pageSize
    };
    this.paginator!.page.next(event);
    this.emitPageEvent(event);
  }

  emitPageEvent(pageEvent: PageEvent) {
    this.page.next(pageEvent);
  }
  /////////////////////////////////////////

  ngOnDestroy(): void {}
}



// ngOnInit(): void {
//   this.db.getTotalBooks().subscribe(v => {this.totalItems = v,console.log(v),this.updateGoto()})
//   this.loadData()    
  
//   //http get request
//   // this.db.getBooks().subscribe(v=>{
//   //   this.books = v;
//   //   this.books.forEach((a:any)=>{
//   //     Object.assign(a,{quantity:1,total:a.price});
//   //   })
//   // })
// }
  




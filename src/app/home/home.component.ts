import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DBService } from '../Services/db.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../Services/image.service';
import { books } from '../Models/books';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private db: DBService, private modalService: NgbModal, private imageService: ImageService){}
  
  books: any = [];
  books2: any = []
  popbooks: any = [];
  bookDes = ''
  bookLink = ''
  bookLink2 = ''
  ngOnInit(): void {
    
    this.db.getBooks(0,40).subscribe(
      v => {
        this.books = v.slice(0,20);
        this.books = [...this.books,...this.books]        
        this.books2 = v.slice(20,40)
        this.books2 = [...this.books2,...this.books2]
        // console.log(v)
        // console.log(this.books)
        // console.log(this.books2)
      }
    )    
  } 
  @ViewChild('details') private detailsComponent: DetailsComponent | undefined
      async openModal(book: any){
        return await this.detailsComponent!.openScrollableContent(book)
      }

  @ContentChild('longContent') longContent?: ElementRef
  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
	}

  @ContentChild('longContent') longContent2?: ElementRef
  async openScrollableContent2(longContent: any, isbn: any) {
		this.modalService.open(longContent, { scrollable: true });             

    let bookMetaData = await this.db.bookDesc(isbn)
    let temp: any

    bookMetaData.subscribe(v => {temp = v})        
    this.bookLink2 = temp.openLibrary.key === undefined ? '' : "https://openlibrary.org/" + temp.openLibrary.key
    this.bookLink = temp.google.totalItems === 0 ? '' : temp.google.items[0]!.volumeInfo.canonicalVolumeLink
    this.bookDes = temp.google.totalItems === 0 ? 'Sorry, No Description Found' :temp.google.items[0]!.volumeInfo.description
	}

  @ContentChild('longContent') longContent3?: ElementRef
  async openScrollableContent3(longContent: any, isbn: any) {
		this.modalService.open(longContent, { scrollable: true });          

    let bookMetaData = await this.db.bookDesc(isbn)
    let temp: any

    bookMetaData.subscribe(v => {temp = v})        
    this.bookLink2 = temp.openLibrary.key === undefined ? '' : "https://openlibrary.org/" + temp.openLibrary.key
    this.bookLink = temp.google.totalItems === 0 ? '' : temp.google.items[0]!.volumeInfo.canonicalVolumeLink
    this.bookDes = temp.google.totalItems === 0 ? 'Sorry, No Description Found' :temp.google.items[0]!.volumeInfo.description
	}


  
  emitImage(book: books){
    return this.imageService.getBook(book.name);
  }
  onImageLoad(evt:any) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;      
      width < 2 && (evt.target.src = '../../assets/bookcoffee.jpg')     
    }
  }
  

}

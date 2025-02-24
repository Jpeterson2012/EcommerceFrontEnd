import { Component, ContentChild, ElementRef, OnInit } from '@angular/core';
import { DBService } from '../Services/db.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../Services/image.service';
import { books } from '../Models/books';


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
  ngOnInit(): void {
    
    this.db.getBooks(0,40).subscribe(
      v => {
        this.books = v.slice(0,20);
        this.books2 = v.slice(20,40)
        // console.log(v)
        // console.log(this.books)
        // console.log(this.books2)
      }
    )    
  }

  images = [
    {name: 'Everything is F*cked',image: '/assets/popbooks/mmevery.jpg'},
    {name: 'One Good Deed',image: '/assets/popbooks/oneGoodDeed.jpg'},
    {name: 'The Subtle Art of Not Giving a F*ck',image: '/assets/popbooks/subtleart.jpg'},
    {name: 'In Cold Blood',image: '/assets/popbooks/tcInColdBlood.jpg'},
    {name: 'The Cold Millions',image: '/assets/popbooks/theCold.jpg'}
  ]

  @ContentChild('longContent') longContent?: ElementRef
  openScrollableContent(longContent: any) {
		this.modalService.open(longContent, { scrollable: true });
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

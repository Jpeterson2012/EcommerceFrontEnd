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
  popbooks: any = [];
  ngOnInit(): void {
    
    this.db.getBooks().subscribe(
      v => {
        this.books = v;
      }
    )

    console.log(this.books)
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
  

}

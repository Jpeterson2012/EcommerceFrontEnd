import { Component, ContentChild, ElementRef, Input, Injectable, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { DBService } from '../Services/db.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
@Injectable()
export class DetailsComponent implements OnInit {

  constructor(private db: DBService,private modalService: NgbModal){}

  ngOnInit(): void { }

  @Input() book: any
  @ViewChild('details') private detailsContent: TemplateRef<DetailsComponent> | undefined

  bookDes = ''
  bookLink = ''
  bookLink2 = ''
    
  async openScrollableContent() {
    this.modalService.open(this.detailsContent, { scrollable: true });           

    let bookMetaData = await this.db.bookDesc(this.book.isbn)
    let temp: any

    bookMetaData.subscribe(v => {temp = v})        
    this.bookLink2 = temp.openLibrary.key === undefined ? '' : "https://openlibrary.org/" + temp.openLibrary.key
    this.bookLink = temp.google.totalItems === 0 ? '' : temp.google.items[0]!.volumeInfo.canonicalVolumeLink
    this.bookDes = temp.google.totalItems === 0 ? 'Sorry, No Description Found' :temp.google.items[0]!.volumeInfo.description
  }

  onImageLoad(evt:any) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;      
      width < 2 && (evt.target.src = '../../assets/bookcoffee.jpg')     
    }    
  }
}

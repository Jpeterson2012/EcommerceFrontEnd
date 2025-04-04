import { Component, ContentChild, ElementRef, Input, Injectable, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { DBService } from '../Services/db.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
@Injectable()
export class DetailsComponent implements OnInit {

  constructor(private db: DBService,private modalService: NgbModal){}

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

    let bookMetaData = await this.db.bookDesc(book.isbn)
    let temp: any

    bookMetaData.subscribe(v => {temp = v})        
    this.bookLink2 = temp.openLibrary.key === undefined ? '' : "https://openlibrary.org/" + temp.openLibrary.key
    this.bookLink = temp.google.totalItems === 0 ? '' : temp.google.items[0]!.volumeInfo.canonicalVolumeLink
    this.bookDes = temp.google.totalItems === 0 ? 'Sorry, No Description Found' :temp.google.items[0]!.volumeInfo.description

    //this.modalRef.result.then()

  }
  
  async close(){
    this.modalRef!.close()
  }

  async dismiss(){
    this.modalRef!.dismiss()
  }

  onImageLoad(evt:any) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;      
      width < 2 && (evt.target.src = '../../assets/bookcoffee.jpg')     
    }    
  }
}

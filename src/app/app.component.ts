import { Component, TemplateRef, DoCheck, OnDestroy, OnInit, ContentChild, ElementRef } from '@angular/core';
import { CartService } from './Services/cart.service';
import { AuthService } from './authentication/Services/auth.service';
import { StorageService } from './authentication/Services/storage.service';
import { DBService } from './Services/db.service';
import { environment } from 'src/environment/environment';

import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck, OnDestroy {
  constructor(private dbService: DBService, private offcanvasService: NgbOffcanvas, private modalService: NgbModal,  private cartService: CartService,private storageService: StorageService, private authService: AuthService){}

  //Login/Authentication
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  boardName?: string;
  user?: any;
  username?: string;
  status = false;
  url = environment.homeURL;



  public totalItem: number = 0;
  ngOnInit(): void {
    // this.cartService.getProducts().subscribe(res=>{
    //   this.totalItem = res.length;
    // })
    this.cartService.currQuantity.subscribe(data=>{
      this.totalItem = data;

      this.isLoggedIn = this.storageService.isLoggedIn();

      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.roles = user.roles;
        
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
  
        this.username = user.username;
      }
    })
  }
    ngDoCheck(): void {
      if (this.isLoggedIn != this.storageService.isLoggedIn()){
        this.status = false;
        this.isLoggedIn = this.storageService.isLoggedIn();
      }
      
      if(this.status === false){

      if (this.storageService.isLoggedIn() === true)
      {
        this.storageService.getUser().roles.includes('ROLE_ADMIN') && (this.boardName = 'Admin Board')
        this.storageService.getUser().roles.includes('ROLE_MODERATOR') && (this.boardName = 'Mod Board')
        this.isLoggedIn = true;
        this.showAdminBoard = (this.storageService.getUser().roles.includes('ROLE_ADMIN') || this.storageService.getUser().roles.includes('ROLE_MODERATOR'));
        this.username = this.storageService.getUser().username;
        this.status = true;
      }
      else{
        this.isLoggedIn = false;
        this.showAdminBoard = false;
        this.username = "";
      }
    }
    }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        // window.location.reload();
        window.location.href = this.url;
      },
      error: err => {
        console.log(err);
      }
    });
  }




  title = 'TheBookShop';
  sitename: string = 'TheBookShop';

  // counter: number = 0;

  
  openCustomPanelClass(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end', panelClass: 'bg-dark' });
	}
  modalRef: any;
  query: string = '';
  searchBooks: any[] = []
  searched = false;

  @ContentChild('content') content2?: ElementRef;
    openLg(content: any) {      
      this.modalRef = this.modalService.open(content, { windowClass: 'modalXL' });
      this.modalRef.result.then(
        this.searchBooks = [],
        this.query = '',        
        this.searched = false
      )
    }
  searchDB(){
    this.dbService.searchBooks(this.query).subscribe(
      v => {this.searchBooks = v, console.log(v),this.searched = true;}
    )    
  }

  closeModal() {      
    // this.searchBooks = []
    this.modalRef.close();
  }
  onImageLoad(evt:any) {
    if (evt && evt.target) {
      const width = evt.target.naturalWidth;      
      width < 2 && (evt.target.src = '../../assets/bookcoffee.jpg')     
    }
  }
    

  ngOnDestroy(): void {
    this.cartService.currQuantity.unsubscribe;
  }
}

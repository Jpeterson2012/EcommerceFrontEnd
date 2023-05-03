import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { DBService } from './Services/db.service';
import { CartService } from './Services/cart.service';
import { AuthService } from './authentication/Services/auth.service';
import { StorageService } from './authentication/Services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DBService]
})
export class AppComponent implements OnInit, DoCheck, OnDestroy {
  constructor(private db: DBService,private cartService: CartService,private storageService: StorageService, private authService: AuthService){}

  //Login/Authentication
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  user?: any;
  username?: string;
  status = false;



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
        this.isLoggedIn = true;
        this.showAdminBoard = this.storageService.getUser().roles.includes('ROLE_ADMIN');
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

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }




  title = 'TheBookShop';
  sitename: string = 'TheBookShop';

  // counter: number = 0;

  


  ngOnDestroy(): void {
    this.cartService.currQuantity.unsubscribe;
  }
}

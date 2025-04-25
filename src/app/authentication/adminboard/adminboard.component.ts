import { Component, OnInit, ContentChild, ElementRef } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { DBService } from 'src/app/Services/db.service';
import { StorageService } from '../Services/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.component.html',
  styleUrls: ['./adminboard.component.css']
})

export class AdminBoardComponent implements OnInit {
  content?: string;
  form: any = {
    isbn: null,
    name: null,
    auth: null,
    year: null,
    publisher: null,
    image: null,
    price: null,
    qty: null
  };
  form2: any = {
    isbn: null,
    name: null,
    auth: null,
    year: null,
    publisher: null,
    image: null,
    price: null,
    qty: null
  };
  form3: any = {
    isbn: null,
    name: null,
    auth: null,
    year: null,
    publisher: null,
    image: null,
    price: null,
    qty: null
  };
  imageurl: string ="";
  isSuccessful = false;
  isNotSuccessful = false;
  errorMessage = '';  

  roles: any;
  AdminBoard = false;


  constructor(private storageService: StorageService, private modalService: NgbModal,private userService: UserService, private authService: AuthService, private dbService: DBService) { }

  //User variable used with DBService getUsers method
  users: any = [];

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.AdminBoard = this.roles.includes('ROLE_ADMIN');

    // this.userService.getAdminBoard().subscribe({
    //   next: data => {       
    //   },
    //   error: err => {
    //     console.log(err)
    //     if (err.error) {
    //       this.content = JSON.parse(err.error).message;
    //     } else {
    //       this.content = "Error with status: " + err.status;
    //     }
    //   }
    // });

    this.dbService.getUsers().subscribe(
      v => this.users = v  
    )
  }
  
  currentUser = '';
  currentUserId: number = 0;
  modalRef: any
  newPW: string = ''
  selectedOption: any;
  options = [
      { value: 'USER', label: 'USER', db: 1 },
      { value: 'MODERATOR', label: 'MODERATOR', db: 2 },
      { value: 'ADMIN', label: 'ADMIN', db: 3 }
  ];
  @ContentChild('content') content2?: ElementRef;
    openLg(content: any, user: any) {
      this.newPW = ''
      this.selectedOption = ''
      this.modalRef = this.modalService.open(content, { size: 'lg' });
      this.currentUserId = user.id
      this.currentUser = `${user.username}  |  ${user.email}  |  ${user.roles[0].name.slice(5,user.roles[0].name.length)}`
    }
    closeModal() {            
      let temp = this.options.filter(a => a.value === this.selectedOption)                  
      this.userService.updateRole(this.currentUserId, temp[0].db).subscribe({
        next: data => {
          let temp2 = this.users.findIndex((a:any) => a.id === this.currentUserId)              
          this.users[temp2].roles = [{"id": temp[0].db, "name": "ROLE_" + temp[0].value}]
                    
          this.successfulUpdate = true;
          this.notsuccessfulUpdate = false;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.notsuccessfulUpdate = true;
        }
      })
      this.modalRef.close();
    }
  //Method for adding new book 
  onSubmit(): void {
    const { isbn, name, auth, year, publisher, image, price, qty } = this.form;

    this.authService.newBook(isbn, name, auth, year, publisher, image, price, qty).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isNotSuccessful = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isNotSuccessful = true;
      }
    });
  }

  //Gets book id number from user, binds it, and passes it to DBService getBookbyId method
  idNum!: any;
  bookData: any = [];
  bookData2: any = [];
  bookData3: any = [];
  successfulUpdate = false;
  notsuccessfulUpdate = false;
  getBookById(method: number = 1, id: number){
    this.dbService.getBookById(id).subscribe((v) =>{
      method === 1 ? (this.bookData = v, this.form = v) : (method === 2 ? (this.bookData2 = v, this.form2 = v) : (this.bookData3 = v, this.form3 = v))
    });
    this.successfulUpdate = false;
  }
  clear(){
    this.idNum = null
    this.form.isbn = null
    this.form.name = null
    this.form.auth = null
    this.form.year = null
    this.form.publisher = null
    this.form.image = null
    this.form.price = null
    this.form.qty = null
    this.bookData = []  
  }
  clear2(){
    this.idNum = null
    this.form2.isbn = null
    this.form2.name = null
    this.form2.auth = null
    this.form2.year = null
    this.form2.publisher = null
    this.form2.image = null
    this.form2.price = null
    this.form2.qty = null
    this.bookData2 = []  
  }
  clear3(){
    this.idNum = null
    this.form3.isbn = null
    this.form3.name = null
    this.form3.auth = null
    this.form3.year = null
    this.form3.publisher = null
    this.form3.image = null
    this.form3.price = null
    this.form3.qty = null
    this.bookData3 = []  
  }

  //Method for post request to books entity
  onSubmitUpdate(f: any): void {
    const { isbn, name, auth, year, publisher, image, price, qty } = this.form2;
    console.log(this.form2.isbn)

    this.authService.updateBook(this.idNum, isbn, name, auth, year, publisher, image, price, qty).subscribe({
      next: data => {
        // console.log(data);        
        this.successfulUpdate = true;
        this.notsuccessfulUpdate = false;
        f.resetForm()
        this.clear2()
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.notsuccessfulUpdate = true;
      }
    });
  }
  
  successDelete = false;
  notsuccessDelete = false;
  idNumDelete!: number;
  //Method for deleting book
  onSubmitDelete(): void {
    this.authService.deleteBook(this.idNumDelete).subscribe({
      next: data => {
        this.clear3()
        this.successDelete = true;
        this.notsuccessDelete = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.notsuccessDelete = true;
      }
    });
  }  
}

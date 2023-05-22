import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { ImageService } from 'src/app/Services/image.service';
import { DBService } from 'src/app/Services/db.service';


@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.component.html',
  styleUrls: ['./adminboard.component.css']
})

export class AdminBoardComponent implements OnInit {
  content?: string;
  form: any = {
    name: null,
    auth: null,
    price: null,
    qty: null
  };
  imageurl: string ="";
  isSuccessful = false;
  isNotSuccessful = false;
  errorMessage = '';


  constructor(private userService: UserService, private authService: AuthService, private imageService: ImageService, private dbService: DBService) { }

  //User variable used with DBService getUsers method
  users: any = [];

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });

    this.dbService.getUsers().subscribe(
      v => {this.users = v;}
    )
  }
  //Method for adding new book 
  onSubmit(): void {
    const { name, auth, price, qty } = this.form;


    this.authService.newBook(name, auth, price, qty).subscribe({
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

  //Adds name and image to imageService array
  addBook(name: any, image: any){
    this.imageService.addBook(name,image);
    alert('Image was add successfully!');
  }

  

  //Gets book id number from user, binds it, and passes it to DBService getBookbyId method
  idNum!: number;
  bookData: any = [];
  successfulUpdate = false;
  notsuccessfulUpdate = false;
  getBookById(id: number){
    this.dbService.getBookById(id).subscribe((v) =>{
      this.bookData = v;
    });
    this.successfulUpdate = false;
  }

  //Method for post request to books entity
  onSubmitUpdate(): void {
    const { name, auth, price, qty } = this.form;

    this.authService.updateBook(this.idNum, name, auth, price, qty).subscribe({
      next: data => {
        console.log(data);
        this.successfulUpdate = true;
        this.notsuccessfulUpdate = false;
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
    

    this.authService.deleteBook(this.idNum).subscribe({
      next: data => {
        console.log(data);
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

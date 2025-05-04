import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { StorageService } from '../Services/storage.service';
import { DBService } from 'src/app/Services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showPassword = false;
  togglePW(){
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthService, private storageService: StorageService, private dbService: DBService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username.trim(), password.trim()).subscribe({
      next: data => {
        let temp: any = {}
        let temp2: any = {}
        this.storageService.saveUser(data);

        this.dbService.getFavorites(data.id).subscribe(v =>  {
          v.map((w: any) => temp[w] = true), 
          sessionStorage.setItem("favorites",JSON.stringify(temp)),
          temp = Object.keys(temp),
          
          temp.length > 0 &&
            this.dbService.getUserBooks(temp).subscribe(v => {
              v.forEach((a:any)=>{
                Object.assign(a,{quantity:1,total:a.price});
                temp2[a.id] = a                
                sessionStorage.setItem("fbooks",JSON.stringify(temp2))
              })
            })

        })
        
        
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;                
        // this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../Services/storage.service';
import { UserService } from '../Services/user.service';
import { DBService } from 'src/app/Services/db.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private storageService: StorageService, private userService: UserService, private dbService: DBService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();    
    let temp = JSON.parse(sessionStorage.getItem("favorites")!)
    temp = Object.keys(temp)    
    if (temp.length > 0){      
      this.dbService.getUserBooks(temp).subscribe(v => console.log(v))
    }
  }
}
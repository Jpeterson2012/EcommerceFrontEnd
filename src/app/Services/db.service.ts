import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { books } from "../Models/books";
import { Observable } from "rxjs";


@Injectable()
export class DBService{

    baseUrl: string = 'http://localhost:8080/';
    
    constructor(private http: HttpClient) {}

    getBooks(): Observable<any>{
        return this.http.get(this.baseUrl + 'books');
    }

    getUsers(): Observable<any>{
        return this.http.get(this.baseUrl + 'api/test/users');
    }

    getBookById(id: number): Observable<any>{
        return this.http.get(this.baseUrl + 'books/'+id);
    }

    
    

    
}
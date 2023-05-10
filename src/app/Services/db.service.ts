import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";


@Injectable()
export class DBService{
    
    constructor(private http: HttpClient) {}

    getBooks(): Observable<any>{
        return this.http.get(environment.apiURL + 'books');
    }

    getUsers(): Observable<any>{
        return this.http.get(environment.apiURL + 'api/test/users');
    }

    getBookById(id: number): Observable<any>{
        return this.http.get(environment.apiURL + 'books/'+id);
    }

    
    

    
}
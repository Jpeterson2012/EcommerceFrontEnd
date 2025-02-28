import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";


@Injectable()
export class DBService{
    
    constructor(private http: HttpClient) {}

    getTotalBooks(): Observable<any>{
        return this.http.get(environment.apiURL + 'books/total')
    }

    getBooks(page: number, pageSize: number): Observable<any>{
        let params =  new HttpParams()
        .set('page', page)
        .set('pageSize', pageSize)
        return this.http.get(environment.apiURL + 'books/p', {params});
    }

    getUsers(): Observable<any>{
        return this.http.get(environment.apiURL + 'api/test/users');
    }

    getBookById(id: number): Observable<any>{
        return this.http.get(environment.apiURL + 'books/'+id);
    }

    searchBooks(query: string): Observable<any>{
        return this.http.get(environment.apiURL + 'books/search/'+query);
    }

    bookDesc(): Observable<any>{
        return this.http.get(environment.apiURL + 'books/desc');
    }
    

    
}
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environment/environment";


@Injectable()
export class DBService{
    
    constructor(private http: HttpClient) {}

    getTotalBooks(): Observable<any>{
        return this.http.get(environment.apiURL + 'books/total')
    }
    getTotalSearch(query: string): Observable<any>{
        return this.http.get(environment.apiURL + 'books/total/'+query)
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
    async fetchDesc(isbn: string){
        try{
          const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
          const resp2 = await fetch(`https://openlibrary.org/isbn/${isbn}.json`)
          const data = await resp.json()
          const data2 = await resp2.json()
          return {"google": data, "openLibrary": data2}
        }
        catch (error) {console.error(error)}
      }
    
    //https://openlibrary.org/isbn/01951534481.json
    async bookDesc(isbn: string): Promise<Observable<any>>{
        let temp = await this.fetchDesc(isbn);
        const myObservable$ = of (temp);

        return myObservable$
    }
    

    
}
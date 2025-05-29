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
    getTotalSearch(type: string, query: string): Observable<any>{
        let params = new HttpParams()
        .set('query', query)
        return this.http.get(environment.apiURL + 'books/total/'+type, {params})
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

    searchBooks(type: string, query: string, page: number): Observable<any>{
        let params = new HttpParams()        
        .set('query', query)
        .set('page', page)        
        return this.http.get(environment.apiURL + 'books/search/' +type, {params});
    }
    async fetchDesc(isbn: string){
        try{
          const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
          const resp2 = await fetch(`https://openlibrary.org/isbn/${isbn}.json`)
          const data = await resp.json()
          const data2 = await resp2.json()
          return {"google": data, "openLibrary": data2}
        }
        catch (error) {
            console.error(error)
            return {"google": "No description found", "openLibrary": "No description found"}
        }
      }
    
    //https://openlibrary.org/isbn/01951534481.json
    async bookDesc(isbn: string): Promise<Observable<any>>{
        let temp = await this.fetchDesc(isbn);
        const myObservable$ = of (temp);

        return myObservable$
    }
    
    addFavorites(user: number, book: number): Observable<any>{    
        let params =  new HttpParams()
        .set('user_id', user)
        .set('book_id', book)
        return this.http.get(environment.apiURL + 'books/favorites', {params});
    }

    deleteFavorites(user: number, book: number): Observable<any>{
        let params =  new HttpParams()
        .set('user_id', user)
        .set('book_id', book)
        return this.http.delete(environment.apiURL + 'books/favorites', {params});
    }

    getFavorites(user: number): Observable<any>{
        return this.http.get(environment.apiURL + 'books/favorites/'+user);
    }

    getUserBooks(ubooks: string): Observable<any>{
        let params = new HttpParams()        
        .set('ubooks', ubooks)
        return this.http.get(environment.apiURL + 'books/ubooks', {params});
    }

    
}
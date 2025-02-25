import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiAUTHURL + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiAUTHURL + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(environment.apiAUTHURL + 'signout', { }, httpOptions);
  }


  newBook(isbn: string, name: string, auth: string, year: number, publisher: string, image: string, price: string, qty: number): Observable<any>{
    return this.http.post(
      environment.apiURL + 'books',
      {
        isbn,
        name,
        auth,
        year,
        publisher,
        image,
        price,
        qty,
      },
    
    )
  }

  updateBook(id: number, isbn: string, name: string, auth: string, year: number, publisher: string, image: string, price: string, qty: number): Observable<any>{
    return this.http.put(
      environment.apiURL + 'books/'+id,
      {
        isbn,
        name,
        auth,
        year,
        publisher,
        image,
        price,
        qty,
      },
    )
  }
  deleteBook(id: number): Observable<any>{
    return this.http.delete(environment.apiURL + 'books/'+id)
  }
}
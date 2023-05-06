import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

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
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }


  newBook(name: string, auth: string, price: string, qty: number): Observable<any>{
    return this.http.post(
      'http://localhost:8080/books',
      {
        name,
        auth,
        price,
        qty,
      },
    
    )
  }

  updateBook(id: number, name: string, auth: string, price: string, qty: number): Observable<any>{
    return this.http.put(
      'http://localhost:8080/books/'+id,
      {
        id,
        name,
        auth,
        price,
        qty,
      },
    )
  }
  deleteBook(id: number): Observable<any>{
    return this.http.delete('http://localhost:8080/books/'+id)
  }
}
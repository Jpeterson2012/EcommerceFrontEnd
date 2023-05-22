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


  newBook(name: string, auth: string, price: string, qty: number): Observable<any>{
    return this.http.post(
      environment.apiURL + 'books',
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
      environment.apiURL + 'books/'+id,
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
    return this.http.delete(environment.apiURL + 'books/'+id)
  }
}
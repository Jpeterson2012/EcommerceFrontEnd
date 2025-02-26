import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

const API_URL = environment.apiURL + 'api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private http: HttpClient) {}
  

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  updateRole(userid: any, roleid: any): Observable<any> {
    console.log(userid)
    console.log(roleid)
    // userid = String(userid)
    // roleid = String(roleid)
    // let params =  new HttpParams()
    //         .set('userid', userid)
    //         .set('roleid', roleid)
    let params = JSON.stringify({"userid": String(userid), "roleid": String(roleid)})
    return this.http.put(API_URL + 'role/' +userid, roleid, httpOptions);
  }
}
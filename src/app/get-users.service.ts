import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(private hc:HttpClient) { }

  getUsers():Observable<any>{
    return this.hc.get("/getusers");
  }

}

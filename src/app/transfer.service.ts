import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  
  constructor(private hc:HttpClient) { }

  updateTransfers(transfer:any):Observable<any>{
    return this.hc.post("/postTransfers",transfer)
  }
  

  editBalance(newBalance:any,user:String):Observable<any>{
    let url="/editbalance/"+user
    let body={balance:newBalance}
    return this.hc.put(url,body)
  }

  getTransfers():Observable<any>{
    return this.hc.get("/getTransfers")
  }
}

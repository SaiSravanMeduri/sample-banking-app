import { Component, OnInit } from '@angular/core';
import { GetUsersService } from '../get-users.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
  allusers:any;
  constructor(private us:GetUsersService) { }
  

  ngOnInit(): void {
    this.us.getUsers().subscribe(
      (res)=>{
        this.allusers=res["message"]
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}

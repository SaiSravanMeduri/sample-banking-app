import { Component, OnInit } from '@angular/core';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.css']
})
export class TransferHistoryComponent implements OnInit {
  allTransfers:any
  constructor(private ts:TransferService) { }

  ngOnInit(): void {
    this.ts.getTransfers().subscribe(
      res=>{
        this.allTransfers=res["message"]
      }
    )
  }

}

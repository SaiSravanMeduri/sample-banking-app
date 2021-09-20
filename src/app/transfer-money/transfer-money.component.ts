import { Component, OnInit } from '@angular/core';
import { GetUsersService } from '../get-users.service';
import { TransferService } from '../transfer.service';

@Component({
	selector: 'app-transfer-money',
	templateUrl: './transfer-money.component.html',
	styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {
	allusers: any;
	constructor(private gu: GetUsersService, private ts: TransferService) { }

	ngOnInit(): void {
		this.gu.getUsers().subscribe(
			(res) => {
				this.allusers = res["message"]
			},
			(err) => {
				console.log(err);
			}
		)
	}
	formSubmit(ref: any) {
		let transferObj = ref.value;
		let senderindex = this.allusers.findIndex((user: any) => {
			return user.userName == transferObj.sender
		})
		let receiverindex = this.allusers.findIndex((user: any) => {
			return user.userName == transferObj.receiver
		})

		this.allusers[senderindex].balance = (+this.allusers[senderindex].balance) - (+transferObj.amount);
		this.allusers[receiverindex].balance = (+this.allusers[receiverindex].balance) + (+transferObj.amount);

		this.ts.editBalance(this.allusers[senderindex].balance, this.allusers[senderindex].userName).subscribe(
			res => {
				if (res["message"] == "no user") {
					alert("sender not found");
				}
			},
			err => {
				alert("something went wrong");
				console.log(err);
			}
		)
		this.ts.editBalance(this.allusers[receiverindex].balance, this.allusers[receiverindex].userName).subscribe(
			res => {
				if (res["message"] == "no user") {
					alert("receiver not found");
				}
				else if (res["message"] == "product updated") {
					alert("Transaction success")
				}
			},
			err => {
				alert("something went wrong");
				console.log(err);
			}
		)
		this.ts.updateTransfers(transferObj).subscribe(
			res => {
				if (res["message"] == "transfer table updated") {
					console.log("transfer table succesfully updated");
				}
			},
			err => {
				console.log(err);
			}
		)
	}

}

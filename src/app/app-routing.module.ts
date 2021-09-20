import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { HomeComponent } from './home/home.component';
import { TransferHistoryComponent } from './transfer-history/transfer-history.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

const routes: Routes = [
  {
    path:"",redirectTo:"/home",pathMatch:"full"
  },
  {
    path:"home",component:HomeComponent
  },
  {
    path:"all-customers",component:AllCustomersComponent 
  },
  {
    path:"transfer-money",component:TransferMoneyComponent
  },
  {
    path:"transfer-history",component:TransferHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

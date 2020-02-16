import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { UserService } from 'src/app/client/app-data/user.service';
import { ModalController } from '@ionic/angular';
import { DisputeDialogComponent } from '../../components/dispute-dialog/dispute-dialog.component';

@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.page.html',
  styleUrls: ['./dispute.page.scss'],
})
export class DisputePage implements OnInit {
  order = [];
  empty = false;
  submit = false;
  user:any;
  input:number;
  constructor(
  private recipayApi:RecipayApiService,
  private userData: UserService ,
  private modalController:ModalController
  ) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(){
   this.userData.userData.subscribe(
     data=>{
     this.user = data;
     }
   ); 
  }
  searchOrder(id:number){
    let params = {
     user_id:this.user.id ,
     order_id: id
    }
    this.recipayApi.findMyOrder(params).subscribe(
    res=>{
    console.log(res);
    this.submit = true;
    if(res && res.data){
      this.empty = false;
      this.order = res.data;
      console.log(this.order);
    }
    if(res && !res.data){
      this.order = [];
      this.empty = true;
    }
    },
    err=>{

    },
    ()=>{

    }

    );
    
  }
  dispute(data:any){
    console.log(data);
    this.modalController.create({
      component: DisputeDialogComponent,
      cssClass: 'modal-size-2' ,
      componentProps: {data:data}
    }).then(async overlay => {
      overlay.present();

      // if (overlay.onWillDismiss()) {
      //   const data = await overlay.onWillDismiss();
      //   if (data && data.data && data.data.quantity) {
      //     this.userService.getUser.subscribe(
      //       user => {
      //         if (user && user.id) {
      //           const params = {
      //             product_id: product.id,
      //             user_id: user.id,
      //             quantity: data.data.quantity
      //           };
      //           this.cartService.addtoCart(params);
      //         }
      //       }
      //     );
      //   }
      // }

    });
  }
}

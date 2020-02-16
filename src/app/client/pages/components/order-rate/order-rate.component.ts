import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { UserService } from 'src/app/client/app-data/user.service';

@Component({
  selector: 'app-order-rate',
  templateUrl: './order-rate.component.html',
  styleUrls: ['./order-rate.component.scss'],
})
export class OrderRateComponent implements OnInit {
  data;
  ratings= [];
  comments=[];
  rated = [];
  user:any;

  constructor(
    private modalController:ModalController,
    private recipayApi:RecipayApiService ,
    private userData:UserService ,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.data.items.forEach((item:any,i:number) => {
      if(item){
        this.ratings.push({i:0});
        this.comments.push({i:null});
        this.rated.push({status:'not-rated'});

      }
    });
    this.getUser();
  }
  getUser(){
    this.userData.userData.subscribe(data=>{
     this.user = data; 
    });
  }
  setRating(index:number,value:number){
  this.ratings[index] = value;
  }
  setComment(index:number , value:any){
   this.comments[index] = value; 
  }
  rate(index:number){
    let params = {
      prod_id:this.data.items[index]['id'],
      user_id:this.user.id,
      rating:this.ratings[index],
      comment:this.comments[index]
    };
    this.recipayApi.rateProduct(params).subscribe(res=>{
    if(res && res.error === false){
      this.rated[index]['status'] = "rated";
      let ratedAll=false;
      this.toastController.create({
      message: res.message,
      duration: 2000
      }).then(overlay => {
      overlay.present();
      });
      this.rated.forEach(item=>{
       if(item.status === 'rated'){
         ratedAll = true;
       }
       else{
         ratedAll = false;
       }
      });
      if(ratedAll){
        this.closeModal();
      }
    }
    },
    err=>{},
    ()=>{}

    );
  
  }
  closeModal(){
    this.modalController.dismiss(); 
  }
}

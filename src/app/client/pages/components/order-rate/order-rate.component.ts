import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(
    private modalController:ModalController
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
    console.log(this.ratings);
    console.log(this.comments);
    console.log(this.rated);
  }
  setRating(index:number,value:number){
    console.log(index);
    console.log(value);
  this.ratings[index] = value;
  console.log(this.ratings);
  }
  setComment(index:number , value:any){
   this.comments[index] = value; 
   console.log(this.comments[index]);
  }
  rate(index:number){
    console.log(index);
   this.rated[index]['status'] = "rated";
   console.log(this.comments[index]);
   console.log(this.ratings[index]);
   let ratedAll=false;
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
  closeModal(){
    this.modalController.dismiss(); 
  }
}

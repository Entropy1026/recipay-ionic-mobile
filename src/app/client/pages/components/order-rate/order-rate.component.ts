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

  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.data.items.forEach((item:any,i:number) => {
      if(item){
        this.ratings.push({i:0});
        this.comments.push({i:null});
      }
    });
  }
  setRating(index:number,value:number){
    console.log(index);
    console.log(value);
  this.ratings[index] = value;
  }
  setComment(index:number , value:any){
   this.comments[index] = value; 
   console.log(this.comments[index]);
  }
  closeModal(){
    this.modalController.dismiss(); 
  }
}

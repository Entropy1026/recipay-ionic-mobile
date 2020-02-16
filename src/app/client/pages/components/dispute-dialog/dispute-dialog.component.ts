import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dispute-dialog',
  templateUrl: './dispute-dialog.component.html',
  styleUrls: ['./dispute-dialog.component.scss'],
})
export class DisputeDialogComponent implements OnInit {
  data;
  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalController.dismiss(); 
  }

}

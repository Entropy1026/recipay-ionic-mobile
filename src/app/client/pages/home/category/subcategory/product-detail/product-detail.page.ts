import { Component, OnInit } from '@angular/core';
import { RecipayApiService } from 'src/app/client/api/recipay-api.service';
import { RecipayDataService } from 'src/app/client/app-data/recipay-data.service';
import { Subcategory } from 'src/app/client/models/subcategory';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/client/app-data/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/client/app-data/user.service';
import { ModalController, ToastController } from '@ionic/angular';
import { OrderQuantityComponent } from 'src/app/client/pages/components/order-quantity/order-quantity.component';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  providers: [VideoPlayer, StreamingMedia, YoutubeVideoPlayer]
})
export class ProductDetailPage implements OnInit {

  cart = [];
  cartItemCount: BehaviorSubject<number>;
  product: Subcategory;
  textInstruction = [];
  instructionShow: boolean = false;
  ingredientShow: boolean = false;
  user: any;

  constructor(
    private recipayApi: RecipayApiService,
    private recipayData: RecipayDataService,
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    private videoPlayer: VideoPlayer,
    private toastController: ToastController,
    private streamingMedia: StreamingMedia,
    private youtube: YoutubeVideoPlayer
  ) { }

  ngOnInit() {
    this.initCart();
    this.initProductDetail();
  }

  initCart() {
    this.cartService.getCart.subscribe(cart => this.cart = cart);
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  initProductDetail() {
    this.recipayData.getSelectedProduct.subscribe(product => {
      this.product = product;
      if (this.product) {
        const stringToSplit = this.product.text_instruction;
        this.textInstruction = stringToSplit.split('.');
      }
    });
    this.userService.userData.subscribe(user => {
      this.user = user;
    });
  }

  collapseInstruct() {
    this.instructionShow = !this.instructionShow;
  }

  collapseIngredient() {
    this.ingredientShow = !this.ingredientShow;
  }
  public sanitizeImage(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + "&output=embed");
  }
  addToCart(product) {
    this.modalController.create({
      component: OrderQuantityComponent,
      cssClass: 'modal-size',
      componentProps: { data: product.available }
    }).then(async overlay => {
      overlay.present();

      if (overlay.onWillDismiss()) {
        const data = await overlay.onWillDismiss();
        if (data && data.data && data.data.quantity) {
          this.userService.getUser.subscribe(
            user => {
              if (user && user.id) {
                const params = {
                  product_id: product.id,
                  user_id: user.id,
                  quantity: data.data.quantity
                };
                this.cartService.addtoCart(params);
              }
            }
          );
        }
      }

    });
  }
  favorite() {
    let params = {
      user_id: this.user.id,
      prod: this.product.id
    };
    this.recipayApi.addToFavorites(params).subscribe(
      res => {
        this.reInitDetails();
        this.toastController.create({
          message: res.message,
          duration: 2000
        }).then(overlay => {
          overlay.present();
        });
      },
      err => {

      },
      () => {

      }
    );
  }
  playVideo(url: any) {
    // this.videoPlayer.play(url).then(() => {
    //   console.log('video completed');
    // }).catch(err => {
    //   console.log(err);
    // });
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: false
    };

    // this.streamingMedia.playVideo(url, options);
    this.youtube.openVideo(url);
  }
  reInitDetails() {
    let params = {
      user: this.user.id,
      prod: this.product.id
    }
    this.recipayApi.getProductDetailsById(params).subscribe(
      res => {
        this.recipayData.setSelectedProduct(res[0]);
        this.initProductDetail();
      },
      err => {
      },
      () => { });
  }
  openCart() {
    this.router.navigate(['/cart']);
  }

}

import { Component, NgZone } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { CameraSource, Plugins, CameraResultType } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private zone: NgZone, 
    private sanitizer: DomSanitizer) {

  }

  async takePicture() {
    const { Camera } = Plugins;

    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
    });

    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.base64Data));

    console.log(this.image);
  }


}

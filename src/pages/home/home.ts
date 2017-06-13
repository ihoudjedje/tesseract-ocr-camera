import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
import Tesseract from 'tesseract.js';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  imageUrl = '';
  recognizedText: string;



  constructor(public navCtrl: NavController, private camera: Camera) {

  }

  openCamera(){
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then( imageData => {
        this.imageUrl = imageData;

      })
      .catch(err => {
        console.log(err);
      });
  }

  recognizeText(image) {
    this.recognizedText = 'en cours';
    console.log(image);
    Tesseract.recognize(image)
      .progress((progress) => {
        console.log('progress', progress);
      })
      .then((tesseractResult) => {
        console.log(tesseractResult);
        this.recognizedText = tesseractResult.text;

      });
  }
}

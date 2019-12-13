import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

import * as firebase from "firebase";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 
  result;
  userEmail: string;
  captureDataUrl: string;
  photos: Photo[] = []
  uploadB: boolean = false;
  
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private Camera: Camera,
    private file: File,
    public alertCtrl: AlertController
  ) {this.alertCtrl = alertCtrl;}
 
  ngOnInit(){
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
      console.log('wrong password')
    }
    console.log('pass the login')
  }
 
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

  async capture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.Camera.DestinationType.DATA_URL,
      encodingType: this.Camera.EncodingType.JPEG,
      mediaType: this.Camera.MediaType.PICTURE,
    };
    this.Camera.getPicture(cameraOptions)
      .then((imageData) => {		
        this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
        
      }, (err) => {
	  
    });
    this.uploadB = true
  } // End of capture camera
  upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
	
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'username/todays-date.jpg'
	
    const imageRef = storageRef.child(this.userEmail+`/${filename}.jpg`);

    var uploadTask = imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL);
    uploadTask.on('state_changed', function(snapshot){
      console.log('success! upload')
    }, function(err){
      console.log('Error: '+err)
    }, function(){
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log(downloadURL)
        var retURL = downloadURL
        console.log(retURL)
        this.photos.unshift({data : retURL})
        console.log(this.photos[0].data)
      });
    })  
    this.uploadB = false;
  }


}


class Photo{
  data : string;
} 


 
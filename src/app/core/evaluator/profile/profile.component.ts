import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { TranslateService } from '@ngx-translate/core';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  // Form
  userForm: FormGroup

  // Data
  user
  tempImageData
  tempImageEncoded

  // Loading
  loadingMessage: HTMLIonLoadingElement

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    public router: Router,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private base64: Base64,
    private loadingController: LoadingController,
    private camera: Camera,
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.getData()
    this.userForm = this.formBuilder.group({
      id: new FormControl(''),
      full_name: new FormControl(''),
      new_nric: new FormControl(''),
      old_nric: new FormControl(''),
      email: new FormControl(''),
      tel: new FormControl(''),
      phone: new FormControl('', Validators.required),
      profile_picture: new FormControl(''),
      nric_picture: new FormControl(''),
      occupation: new FormControl(''),
    })
  }

  getData(){
    this.user = this.authService.userSelfDetail
  }

  async openUploadSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant('PROFILE.uploadSheetHeader'),
      buttons: [
        {
          text: this.translate.instant('PROFILE.uploadCameraText'),
          role: 'destructive',
          icon: 'camera',
          handler: () => {
            console.log('Camera opened')
            this.openCamera()
          }
        }, 
        {
          text: this.translate.instant('PROFILE.uploadGalleryText'),
          icon: 'images',
          handler: () => {
            console.log('Gallery opened')
            this.openGallery()
          }
        },
        {
          text: this.translate.instant('PROFILE.uploadCancel'),
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options)
      .then(
        (imageData) => {
          this.tempImageData = imageData;
          //this.tempImage = (<any>window).Ionic.WebView.convertFileSrc(imageData);
          this.encodeFile64()
        }, 
        (err) => {
          alert("error " + JSON.stringify(err))
        }
      )
  }

  openGallery (): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,      
      quality: 70,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    }
  
    this.camera.getPicture(cameraOptions)
      .then(
        (file_uri) => {
          this.tempImageData = file_uri
          this.encodeFile64()
        },
        (err) => {
          console.log(err
        )}
      );
    /**/
  }

  encodeFile64(){
    this.base64.encodeFile(this.tempImageData).then((base64File: string) => {
      this.tempImageEncoded =  base64File
      this.userForm.value.nric_picture = this.tempImageEncoded
      console.log(this.tempImageEncoded);
    }, (err) => {
      console.log(err);
    });
  }


  async update(){

    this.loadingMessage = await this.loadingController.create({
      message: 'Loading...'
    });
    await this.loadingMessage.present();

    this.userForm.value.id = this.user.id

    if (!this.userForm.value.username){
      this.userForm.value.username = this.user.username
    }
    if(!this.userForm.value.full_name){
      this.userForm.value.full_name = this.user.full_name
    }
    if(!this.userForm.value.new_nric){
      this.userForm.value.new_nric = this.user.new_nric
    }
    if(!this.userForm.value.old_nric){
      this.userForm.value.old_nric = this.user.old_nric
    }
    if(!this.userForm.value.phone){
      this.userForm.value.phone = this.user.phone
    }
    if(!this.userForm.value.email){
      this.userForm.value.email = this.user.email
    }
    if(!this.userForm.value.tel){
      this.userForm.value.tel = this.user.tel
    }
    if(!this.userForm.value.occupation){
      if(this.user.occupation){
        this.userForm.value.occupation = this.user.occupation
      }
      else {
        this.userForm.value.occupation = ''
      }
    }
    if(!this.userForm.value.nric_picture){
      if(this.user.occupation){
        this.userForm.value.nric_picture = this.user.nric_picture
      }
      else {
        this.userForm.value.nric_picture = ''
      }
    }
    if(!this.userForm.value.profile_picture){
      if(this.user.occupation){
        this.userForm.value.profile_picture = this.user.profile_picture
      }
      else {
        this.userForm.value.profile_picture = ''
      }
    }
    console.log('Update value: ', this.userForm.value)
    this.authService.update(this.userForm.value).subscribe(
      (res) => {
        //console.log('Update user success')
        this.authService.getUsers().subscribe()
        this.successfulToast()
        this.getData()
      },
      (err) => {
        //console.log('Update user unsuccessful')
        this.unsuccessfulToast()
      },
      () => {
        this.loadingMessage.dismiss()
      }
    )
  }

  async successfulToast() {
    const toast = await this.toastController.create({
      message: this.translate.instant('PROFILE.successMessage'),
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async unsuccessfulToast() {
    const toast = await this.toastController.create({
      message: this.translate.instant('PROFILE.unsuccessMessage'),
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}

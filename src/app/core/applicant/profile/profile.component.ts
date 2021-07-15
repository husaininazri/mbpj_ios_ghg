import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { 
  ActionSheetController,
  AlertController, 
  LoadingController,
  ToastController
} from '@ionic/angular';
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

  // Data
  user
  tempImageData
  tempImageEncoded

  // Types
  genders = [
    { value: 'FM', text: 'Female' },
    { value: 'ML', text: 'Male' }
  ]
  relationshipTypes = [
    { value: 'SL', text: 'Self' },
    { value: 'SP', text: 'Spouse' },
    { value: 'SB', text: 'Siblings' },
    { value: 'PR', text: 'Parents' },
    { value: 'CH', text: 'Children' }
  ]

  // Loading
  loadingMessage: HTMLIonLoadingElement

  // Form
  userForm: FormGroup

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private base64: Base64,
    private camera: Camera,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private translate: TranslateService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      full_name: new FormControl('', Validators.required),
      new_nric: new FormControl('', Validators.required),
      old_nric: new FormControl(''),
      tel: new FormControl(''),
      username: new FormControl(''),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gender: new FormControl(''),
      profile_picture: new FormControl(''),
      nric_picture: new FormControl(''),
      occupation: new FormControl(''),
      relationship_type: new FormControl('')
    })
    this.getData()
  }

  getData() {
    this.user = this.authService.userSelfDetail
    this.userForm.patchValue({
      ...this.user
    });
    if (this.user.new_nric == "") {
      this.userForm.controls['new_nric'].setValue(this.user.username)
      this.user.new_nric = this.user.username
    }
  }

  async openUploadSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('PROFILE.uploadSheetHeader'),
      buttons: [
        {
          text: this.translate.instant('PROFILE.uploadCameraText'),
          role: 'destructive',
          icon: 'camera',
          handler: () => {
            // console.log('Camera opened')
            this.openCamera()
          }
        }, 
        {
          text: this.translate.instant('PROFILE.uploadGalleryText'),
          icon: 'images',
          handler: () => {
            // console.log('Gallery opened')
            this.openGallery()
          }
        },
        {
          text: this.translate.instant('PROFILE.uploadCancel'),
          icon: 'close',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
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
          // this.tempImage = (<any>window).Ionic.WebView.convertFileSrc(imageData);
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
          console.error(err
        )}
      );
    /**/
  }

  encodeFile64(){
    this.base64.encodeFile(this.tempImageData)
      .then(
        (base64File: string) => {
          this.tempImageEncoded =  base64File
          this.userForm.value.nric_picture = this.tempImageEncoded
          console.log(this.tempImageEncoded)
        },
        (err) => {
          console.error(err)
        }
      )
  }

  async update() {

    this.loadingMessage = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await this.loadingMessage.present()

    // this.userForm.value.id = this.user.id
    if (!this.userForm.value.username) {
      this.userForm.value.username = this.user.username
    }
    if (!this.userForm.value.full_name) {
      this.userForm.value.full_name = this.user.full_name
    }
    if (!this.userForm.value.new_nric) {
      this.userForm.value.new_nric = this.user.new_nric
    }
    if (!this.userForm.value.old_nric) {
      this.userForm.value.old_nric = this.user.old_nric
    }
    if (!this.userForm.value.phone) {
      this.userForm.value.phone = this.user.phone
    }
    if (!this.userForm.value.email) {
      this.userForm.value.email = this.user.email
    }
    if (!this.userForm.value.gender) {
      this.userForm.value.gender = this.user.gender
    }
    if (!this.userForm.value.tel) {
      this.userForm.value.tel = this.user.tel
    }
    if (!this.userForm.value.occupation) {
      if (this.user.occupation) {
        this.userForm.value.occupation = this.user.occupation
      }
      else {
        this.userForm.value.occupation = ''
      }
    }
    if (!this.userForm.value.nric_picture) {
      if (this.user.nric_picture) {
        this.userForm.value.nric_picture = this.user.nric_picture
      }
      else {
        this.userForm.value.nric_picture = ''
      }
    }
    if (!this.userForm.value.profile_picture){
      if (this.user.profile_picture) {
        this.userForm.value.profile_picture = this.user.profile_picture
      }
      else {
        this.userForm.value.profile_picture = ''
      }
    }
    if (!this.userForm.value.relationship_type) {
      this.userForm.value.relationship_type = this.user.relationship_type
    }
    console.log('Update value: ', this.userForm.value)
    this.authService.update(this.userForm.value).subscribe(
      (res) => {
        // console.log('res')
        this.authService.getUsers()
        this.getData()
      },
      (err) => {
        // console.error('err')
        this.loadingMessage.dismiss()
      },
      () => {
        this.loadingMessage.dismiss()
        let message = this.translate.instant('PROFILE.successMessage')
        this.notifyService.openToastr(message)
      }
    )
  }

}

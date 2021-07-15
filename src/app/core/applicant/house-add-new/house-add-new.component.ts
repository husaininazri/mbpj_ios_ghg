import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HousesService } from 'src/app/shared/services/houses/houses.service';
import { AlertController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Areas } from '../../../../assets/data/area';

@Component({
  selector: 'app-house-add-new',
  templateUrl: './house-add-new.component.html',
  styleUrls: ['./house-add-new.component.scss'],
})
export class HouseAddNewComponent implements OnInit {

  // Loading
  loadingMessage: HTMLIonLoadingElement

  // Form
  houseForm: FormGroup
  tempImageData: [string, string, string, string, string, string, string] = [null, null, null, null, null, null, null]
  tempImageEncoded: [string, string, string, string, string, string, string] = [null, null, null, null, null, null, null]

  houses = [
    { value: 'AS', text: this.translate.instant('HOUSEADD.textApartment') },
    { value: 'BS', text: this.translate.instant('HOUSEADD.textBungalow') },
    { value: 'CD', text: this.translate.instant('HOUSEADD.textCondominium') },
    { value: 'FL', text: this.translate.instant('HOUSEADD.textFlat') },
    { value: 'TE', text: this.translate.instant('HOUSEADD.textTerrace') },
    { value: 'TO', text: this.translate.instant('HOUSEADD.textTownhouse') },
    { value: 'OT', text: this.translate.instant('HOUSEADD.textOther') }
  ]

  areas = Areas

  constructor(
    private authService: AuthService,
    private houseService: HousesService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private base64: Base64,
    private camera: Camera,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.houseForm = this.formBuilder.group({
      applicant: new FormControl(''),
      address: new FormControl('', Validators.required),
      postcode: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      area: new FormControl('', Validators.required),
      assessment_tax_account: new FormControl('', Validators.required),
      assessment_tax_doc: new FormControl(''),
      building_type: new FormControl('', Validators.required),
      staying_duration_years: new FormControl('', Validators.required),
      staying_duration_months: new FormControl('', Validators.required),
      permanent_occupant: new FormControl('', Validators.required),
      vehicle_car: new FormControl('', Validators.required),
      vehicle_motorcycle: new FormControl('', Validators.required),
      vehicle_bicycle: new FormControl('', Validators.required),
      vehicle_other: new FormControl('', Validators.required),
      electricity_bill_1_month: new FormControl('', Validators.required),
      electricity_bill_1_usage: new FormControl('', Validators.required),
      electricity_bill_1_doc: new FormControl(''),
      electricity_bill_2_month: new FormControl('', Validators.required),
      electricity_bill_2_usage: new FormControl('', Validators.required),
      electricity_bill_2_doc: new FormControl(''),
      electricity_bill_3_month: new FormControl('', Validators.required),
      electricity_bill_3_usage: new FormControl('', Validators.required),
      electricity_bill_3_doc: new FormControl(''),
      water_bill_1_month: new FormControl('', Validators.required),
      water_bill_1_usage: new FormControl('', Validators.required),
      water_bill_1_doc: new FormControl(''),
      water_bill_2_month: new FormControl('', Validators.required),
      water_bill_2_usage: new FormControl('', Validators.required),
      water_bill_2_doc: new FormControl(''),
      water_bill_3_month: new FormControl('', Validators.required),
      water_bill_3_usage: new FormControl('', Validators.required),
      water_bill_3_doc: new FormControl(''),
    })
  }
  
  async addNewHouse() {
    this.loadingMessage = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await this.loadingMessage.present();

    this.houseForm.value.applicant = this.authService.userID
    console.log(this.houseForm.value)
    this.houseService.register(this.houseForm.value).subscribe(
      (res) => {
        console.log('House registration success')
        this.houseService.getUser(this.authService.userID).subscribe(
          () => {
            this.loadingMessage.dismiss();
            this.successfulAddMessage()
            this.router.navigate(['/applicant/house'])
          }
        )
      },
      (err) => {
        this.loadingMessage.dismiss();
        console.log('House registration not success')
        this.unsuccessfulAddMessage()
      },
      () => {
      }
    )
  }

  async successfulAddMessage() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('HOUSEADD.successAddHeader'),
      message: this.translate.instant('HOUSEADD.successAddMessage'),
      buttons: [this.translate.instant('HOUSEADD.successAddButton')]
    });

    await alert.present();
  }

  async unsuccessfulAddMessage() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('HOUSEADD.unsuccessAddHeader'),
      message: this.translate.instant('HOUSEADD.unsuccessAddMessage'),
      buttons: [this.translate.instant('HOUSEADD.successAddButton')]
    });

    await alert.present();
  }

  async openUploadSheet(billNumber: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translate.instant('HOUSEADD.uploadSheetHeader'),
      buttons: [
        {
          text: this.translate.instant('HOUSEADD.uploadCameraText'),
          role: 'destructive',
          icon: 'camera',
          handler: () => {
            console.log('Camera opened')
            this.openCamera(billNumber)
          }
        }, 
        {
          text: this.translate.instant('HOUSEADD.uploadGalleryText'),
          icon: 'images',
          handler: () => {
            console.log('Gallery opened')
            this.openGallery(billNumber)
          }
        },
        {
          text: this.translate.instant('HOUSEADD.uploadCancel'),
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

  openCamera(billNumber: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.tempImageData[billNumber] = imageData;
      this.encodeFile64(billNumber)
      //this.tempImage[billNumber] = (<any>window).Ionic.WebView.convertFileSrc(imageData);
    }, (err) => {
      alert("error " + JSON.stringify(err))
    })
  }

  openGallery (billNumber: number): void {
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
          this.tempImageData[billNumber] = file_uri
          this.encodeFile64(billNumber)
        },
        (err) => {
          console.log(err
        )}
      );
    /**/
  }

  async encodeFile64(billNumber: number){
    this.loadingMessage = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await this.loadingMessage.present();

    setTimeout(
      () => {
        this.loadingMessage.dismiss()
      }, 5000
    )

    this.base64.encodeFile(this.tempImageData[billNumber]).then((base64File: string) => {
      this.tempImageEncoded[billNumber] =  base64File
      
      if (billNumber == 0) {
        this.houseForm.patchValue({
          assessment_tax_doc: this.tempImageEncoded[billNumber]
        });
        // this.houseForm.value.assessment_tax_doc = this.tempImageEncoded[billNumber]
      }
      if (billNumber == 1) {
        this.houseForm.patchValue({
          electricity_bill_1_doc: this.tempImageEncoded[billNumber]
        });
        // this.houseForm.value.electricity_bill_1_doc = this.tempImageEncoded[billNumber]
      }
      else if (billNumber == 2) {
        this.houseForm.patchValue({
          electricity_bill_2_doc: this.tempImageEncoded[billNumber]
        });
        // this.houseForm.value.electricity_bill_2_doc = this.tempImageEncoded[billNumber]
      }
      else if (billNumber == 3) {
        this.houseForm.patchValue({
          electricity_bill_3_doc: this.tempImageEncoded[billNumber]
        });
        // this.houseForm.value.electricity_bill_3_doc = this.tempImageEncoded[billNumber]
      }
      else if (billNumber == 4) {
        this.houseForm.patchValue({
          water_bill_1_doc: this.tempImageEncoded[billNumber]
        });
        // this.houseForm.value.water_bill_1_doc = this.tempImageEncoded[billNumber]
      }
      else if (billNumber == 5) {
        this.houseForm.patchValue({
          water_bill_2_doc: this.tempImageEncoded[billNumber]
        });
        // this.houseForm.value.water_bill_2_doc = this.tempImageEncoded[billNumber]
      }
      else if (billNumber == 6) {
        this.houseForm.patchValue({
          water_bill_3_doc: this.tempImageEncoded[billNumber]
        });
        // this.houseForm.value.water_bill_3_doc = this.tempImageEncoded[billNumber]
      }
      console.log(this.tempImageEncoded[billNumber]);
      console.log('houseForm', this.houseForm.value);
    }, (err) => {
      console.log(err);
    });
  }
}

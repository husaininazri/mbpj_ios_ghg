import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  LoadingController,
  ActionSheetController,
  AlertController,
} from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Base64 } from "@ionic-native/base64/ngx";
import { TranslateService } from "@ngx-translate/core";

import { ApplicationsService } from "src/app/shared/services/applications/applications.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { House } from "src/app/shared/services/houses/houses.model";
import { HousesService } from "src/app/shared/services/houses/houses.service";

import * as moment from "moment";

import { Areas } from "src/assets/data/area";

@Component({
  selector: "app-house-detail",
  templateUrl: "./house-detail.component.html",
  styleUrls: ["./house-detail.component.scss"],
})
export class HouseDetailComponent implements OnInit {
  checkHouseApplication: boolean = false;

  houseCredentials = new FormGroup({
    id: new FormControl(""),
    applicant: new FormControl(""),
    address: new FormControl(""),
    postcode: new FormControl(""),
    area: new FormControl(""),
    assessment_tax_account: new FormControl(""),
    assessment_tax_doc: new FormControl(""),
    building_type: new FormControl(""),
    staying_duration_years: new FormControl(""),
    staying_duration_months: new FormControl(""),
    permanent_occupant: new FormControl(""),
    vehicle_car: new FormControl(""),
    vehicle_motorcycle: new FormControl(""),
    vehicle_bicycle: new FormControl(""),
    vehicle_other: new FormControl(""),
    electricity_bill_1_month: new FormControl("", Validators.required),
    electricity_bill_1_usage: new FormControl("", Validators.required),
    electricity_bill_1_doc: new FormControl(""),
    electricity_bill_2_month: new FormControl("", Validators.required),
    electricity_bill_2_usage: new FormControl("", Validators.required),
    electricity_bill_2_doc: new FormControl(""),
    electricity_bill_3_month: new FormControl("", Validators.required),
    electricity_bill_3_usage: new FormControl("", Validators.required),
    electricity_bill_3_doc: new FormControl(""),
    water_bill_1_month: new FormControl("", Validators.required),
    water_bill_1_usage: new FormControl("", Validators.required),
    water_bill_1_doc: new FormControl(""),
    water_bill_2_month: new FormControl("", Validators.required),
    water_bill_2_usage: new FormControl("", Validators.required),
    water_bill_2_doc: new FormControl(""),
    water_bill_3_month: new FormControl("", Validators.required),
    water_bill_3_usage: new FormControl("", Validators.required),
    water_bill_3_doc: new FormControl(""),
  });

  public areas = Areas;
  public tempHouse;

  public houses = [
    { value: "AS", text: this.translate.instant("HOUSEDETAIL.textApartment") },
    { value: "BS", text: this.translate.instant("HOUSEDETAIL.textBungalow") },
    {
      value: "CD",
      text: this.translate.instant("HOUSEDETAIL.textCondominium"),
    },
    { value: "FL", text: this.translate.instant("HOUSEDETAIL.textFlat") },
    { value: "TE", text: this.translate.instant("HOUSEDETAIL.textTerrace") },
    { value: "TO", text: this.translate.instant("HOUSEDETAIL.textTownhouse") },
    { value: "OT", text: this.translate.instant("HOUSEDETAIL.textOther") },
  ];

  public loadingMessage: HTMLIonLoadingElement;

  public tempImageData: [
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ] = [null, null, null, null, null, null, null];
  public tempImageEncoded: [
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ] = [null, null, null, null, null, null, null];

  constructor(
    private applicationService: ApplicationsService,
    private authService: AuthService,
    private houseService: HousesService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public base64: Base64,
    private camera: Camera,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.tempHouse = this.router.getCurrentNavigation().extras;

    this.applicationService
      .filter("applied_house=" + this.tempHouse.id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          if (res.length > 0) {
            if (res[0].status == 'CR') {
              this.checkHouseApplication = true;
            }
          }
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  async updateHouse() {
    this.loadingMessage = await this.loadingController.create({
      message: "Loading...",
    });
    await this.loadingMessage.present();

    this.houseCredentials.value.id = this.tempHouse.id;
    this.houseCredentials.value.applicant = this.tempHouse.applicant;
    if (!this.houseCredentials.value.address) {
      this.houseCredentials.value.address = this.tempHouse.address;
    }
    if (!this.houseCredentials.value.postcode) {
      this.houseCredentials.value.postcode = this.tempHouse.postcode;
    }
    if (!this.houseCredentials.value.area) {
      this.houseCredentials.value.area = this.tempHouse.area;
    }
    if (!this.houseCredentials.value.assessment_tax_account) {
      this.houseCredentials.value.assessment_tax_account =
        this.tempHouse.assessment_tax_account;
    }
    if (!this.houseCredentials.value.building_type) {
      this.houseCredentials.value.building_type = this.tempHouse.building_type;
    }
    if (!this.houseCredentials.value.staying_duration_years) {
      this.houseCredentials.value.staying_duration_years =
        this.tempHouse.staying_duration_years;
    }
    if (!this.houseCredentials.value.staying_duration_months) {
      this.houseCredentials.value.staying_duration_months =
        this.tempHouse.staying_duration_months;
    }
    if (!this.houseCredentials.value.permanent_occupant) {
      this.houseCredentials.value.permanent_occupant =
        this.tempHouse.permanent_occupant;
    }
    if (!this.houseCredentials.value.vehicle_car) {
      this.houseCredentials.value.vehicle_car = this.tempHouse.vehicle_car;
    }
    if (!this.houseCredentials.value.vehicle_motorcycle) {
      this.houseCredentials.value.vehicle_motorcycle =
        this.tempHouse.vehicle_motorcycle;
    }
    if (!this.houseCredentials.value.vehicle_bicycle) {
      this.houseCredentials.value.vehicle_bicycle =
        this.tempHouse.vehicle_bicycle;
    }
    if (!this.houseCredentials.value.vehicle_other) {
      this.houseCredentials.value.vehicle_other = this.tempHouse.vehicle_other;
    }
    if (!this.houseCredentials.value.electricity_bill_1_month) {
      this.houseCredentials.value.electricity_bill_1_month =
        this.tempHouse.electricity_bill_1_month;
    }
    if (!this.houseCredentials.value.electricity_bill_1_usage) {
      this.houseCredentials.value.electricity_bill_1_usage =
        this.tempHouse.electricity_bill_1_usage;
    }
    if (!this.houseCredentials.value.electricity_bill_1_doc) {
      if (this.tempHouse.electricity_bill_1_doc) {
        this.houseCredentials.value.electricity_bill_1_doc =
          this.tempHouse.electricity_bill_1_doc;
      } else {
        this.houseCredentials.value.electricity_bill_1_doc = "";
      }
    }
    if (!this.houseCredentials.value.electricity_bill_2_month) {
      this.houseCredentials.value.electricity_bill_2_month =
        this.tempHouse.electricity_bill_2_month;
    }
    if (!this.houseCredentials.value.electricity_bill_2_usage) {
      this.houseCredentials.value.electricity_bill_2_usage =
        this.tempHouse.electricity_bill_2_usage;
    }
    if (!this.houseCredentials.value.electricity_bill_2_doc) {
      if (this.tempHouse.electricity_bill_2_doc) {
        this.houseCredentials.value.electricity_bill_2_doc =
          this.tempHouse.electricity_bill_2_doc;
      } else {
        this.houseCredentials.value.electricity_bill_2_doc = "";
      }
    }
    if (!this.houseCredentials.value.electricity_bill_3_month) {
      this.houseCredentials.value.electricity_bill_3_month =
        this.tempHouse.electricity_bill_3_month;
    }
    if (!this.houseCredentials.value.electricity_bill_3_usage) {
      this.houseCredentials.value.electricity_bill_3_usage =
        this.tempHouse.electricity_bill_3_usage;
    }
    if (!this.houseCredentials.value.electricity_bill_3_doc) {
      if (this.tempHouse.electricity_bill_3_doc) {
        this.houseCredentials.value.electricity_bill_3_doc =
          this.tempHouse.electricity_bill_3_doc;
      } else {
        this.houseCredentials.value.electricity_bill_3_doc = "";
      }
    }
    if (!this.houseCredentials.value.water_bill_1_month) {
      this.houseCredentials.value.water_bill_1_month =
        this.tempHouse.water_bill_1_month;
    }
    if (!this.houseCredentials.value.water_bill_1_usage) {
      this.houseCredentials.value.water_bill_1_usage =
        this.tempHouse.water_bill_1_usage;
    }
    if (!this.houseCredentials.value.water_bill_1_doc) {
      if (this.tempHouse.water_bill_1_doc) {
        this.houseCredentials.value.water_bill_1_doc =
          this.tempHouse.water_bill_1_doc;
      } else {
        this.houseCredentials.value.water_bill_1_doc = "";
      }
    }
    if (!this.houseCredentials.value.water_bill_2_month) {
      this.houseCredentials.value.water_bill_2_month =
        this.tempHouse.water_bill_2_month;
    }
    if (!this.houseCredentials.value.water_bill_2_usage) {
      this.houseCredentials.value.water_bill_2_usage =
        this.tempHouse.water_bill_2_usage;
    }
    if (!this.houseCredentials.value.water_bill_2_doc) {
      if (this.tempHouse.water_bill_2_doc) {
        this.houseCredentials.value.water_bill_2_doc =
          this.tempHouse.water_bill_2_doc;
      } else {
        this.houseCredentials.value.water_bill_2_doc = "";
      }
    }
    if (!this.houseCredentials.value.water_bill_3_month) {
      this.houseCredentials.value.water_bill_3_month =
        this.tempHouse.water_bill_3_month;
    }
    if (!this.houseCredentials.value.water_bill_3_usage) {
      this.houseCredentials.value.water_bill_3_usage =
        this.tempHouse.water_bill_3_usage;
    }
    if (!this.houseCredentials.value.water_bill_3_doc) {
      if (this.tempHouse.water_bill_3_doc) {
        this.houseCredentials.value.water_bill_3_doc =
          this.tempHouse.water_bill_3_doc;
      } else {
        this.houseCredentials.value.water_bill_3_doc = "";
      }
    }
    console.log("Update value: ", this.houseCredentials.value);
    this.houseService
      .update(this.houseCredentials.value, this.tempHouse.id)
      .subscribe(
        (res) => {
          console.log("Update house success");
          this.houseService.getUser(this.authService.userID).subscribe(() => {
            this.loadingMessage.dismiss();
            this.successfulUpdateMessage();
            this.router.navigate(["/applicant/house"]);
          });
        },
        (err) => {
          console.log("Update house unsuccessful");
          this.loadingMessage.dismiss();
          this.unsuccessfulUpdateMessage();
        },
        () => {}
      );
  }

  async successfulUpdateMessage() {
    const alert = await this.alertController.create({
      header: this.translate.instant("HOUSEDETAIL.successUpdateHeader"),
      message: this.translate.instant("HOUSEDETAIL.successUpdateMessage"),
      buttons: [this.translate.instant("HOUSEDETAIL.successUpdateButton")],
    });

    await alert.present();
  }

  async unsuccessfulUpdateMessage() {
    const alert = await this.alertController.create({
      header: this.translate.instant("HOUSEDETAIL.unsuccessUpdateHeader"),
      message: this.translate.instant("HOUSEDETAIL.unsuccessUpdateMessage"),
      buttons: [this.translate.instant("HOUSEDETAIL.successUpdateButton")],
    });

    await alert.present();
  }

  async openUploadSheet(billNumber: number) {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant("HOUSEDETAIL.uploadSheetHeader"),
      buttons: [
        {
          text: this.translate.instant("HOUSEDETAIL.uploadCameraText"),
          role: "destructive",
          icon: "camera",
          handler: () => {
            console.log("Camera opened");
            this.openCamera(billNumber);
          },
        },
        {
          text: this.translate.instant("HOUSEDETAIL.uploadGalleryText"),
          icon: "images",
          handler: () => {
            console.log("Gallery opened");
            this.openGallery(billNumber);
          },
        },
        {
          text: this.translate.instant("HOUSEDETAIL.uploadCancel"),
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }

  openCamera(billNumber: number) {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.tempImageData[billNumber] = imageData;
        this.encodeFile64(billNumber);
        //this.tempImage = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      },
      (err) => {
        alert("error " + JSON.stringify(err));
      }
    );
  }

  openGallery(billNumber: number): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 70,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };

    this.camera.getPicture(cameraOptions).then(
      (file_uri) => {
        this.tempImageData[billNumber] = file_uri;
        this.encodeFile64(billNumber);
      },
      (err) => {
        console.log(err);
      }
    );
    /**/
  }

  encodeFile64(billNumber: number) {
    this.base64.encodeFile(this.tempImageData[billNumber]).then(
      (base64File: string) => {
        this.tempImageEncoded[billNumber] = base64File;
        if (billNumber == 0) {
          this.houseCredentials.value.assessment_tax_doc =
            this.tempImageEncoded[billNumber];
        }
        if (billNumber == 1) {
          this.houseCredentials.value.electricity_bill_1_doc =
            this.tempImageEncoded[billNumber];
        } else if (billNumber == 2) {
          this.houseCredentials.value.electricity_bill_2_doc =
            this.tempImageEncoded[billNumber];
        } else if (billNumber == 3) {
          this.houseCredentials.value.electricity_bill_3_doc =
            this.tempImageEncoded[billNumber];
        } else if (billNumber == 4) {
          this.houseCredentials.value.water_bill_1_doc =
            this.tempImageEncoded[billNumber];
        } else if (billNumber == 5) {
          this.houseCredentials.value.water_bill_2_doc =
            this.tempImageEncoded[billNumber];
        } else if (billNumber == 6) {
          this.houseCredentials.value.water_bill_3_doc =
            this.tempImageEncoded[billNumber];
        }
        console.log(this.tempImageEncoded[billNumber]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

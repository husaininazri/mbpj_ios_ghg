import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormArray,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  AlertController,
  ToastController,
  ActionSheetController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

import { Base64 } from "@ionic-native/base64/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ApplicationsService } from "src/app/shared/services/applications/applications.service";
import { ApplicationAssessmentsService } from "src/app/shared/services/application-assessments/application-assessments.service";
import { AssessmentAspect } from "src/app/shared/services/assessment-aspects/assessment-aspects.model";
import { AssessmentAspectsService } from "src/app/shared/services/assessment-aspects/assessment-aspects.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";

import * as moment from "moment";

@Component({
  selector: "app-apply-form",
  templateUrl: "./apply-form.component.html",
  styleUrls: ["./apply-form.component.scss"],
})
export class ApplyFormComponent implements OnInit {
  public formGroup: FormGroup;
  public form: FormArray;

  past_application: boolean = false;
  past_application_number: string = "";

  applicationForm = new FormGroup({
    date_submitted: new FormControl(""),
    applicant: new FormControl(""),
    applied_house: new FormControl(""),
    past_application: new FormControl(false),
    past_application_number: new FormControl(""),
  });

  public tempImageData: string[] = [];
  public tempImageEncoded: string[] = [];

  public tempApplication;
  public tempAssessmentAspects: AssessmentAspect[] = [];
  public tempSelectedHouse;

  public consumptionElectricity: number = 0;
  public consumptionWater: number = 0;

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    private applicationAssessmentService: ApplicationAssessmentsService,
    private assessmentAspectService: AssessmentAspectsService,
    private notificationService: NotificationsService,
    private notifyService: NotifyService,
    public activatedRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public toastController: ToastController,
    public base64: Base64,
    public router: Router,
    private formBuilder: FormBuilder,
    private camera: Camera,
    public translate: TranslateService
  ) {
    this.tempSelectedHouse = this.router.getCurrentNavigation().extras;
    this.tempAssessmentAspects =
      this.assessmentAspectService.retrievedAssessmentAspects;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      form: this.formBuilder.array([this.initAssessment()]),
    });

    this.applicationForm.patchValue({
      applicant: this.authService.userID,
      applied_house: this.tempSelectedHouse.id,
      date_submitted: moment(new Date()).format("YYYY-MM-DD"),
    });
    this.calculateConsumption();
  }

  // Dynamic form
  initAssessment() {
    return this.formBuilder.group({
      application: new FormControl(""),
      assessment_aspect: new FormControl("", Validators.required),
      assessment_name: new FormControl(""),
      assessment_type: new FormControl(""),
      remarks: new FormControl(""),
      supporting_doc: new FormControl(""),
      total_led: new FormControl(0),
      total_lamp: new FormControl(0),
      energy_saving: new FormControl(0),
    });
  }

  addAssessment() {
    this.form = this.formGroup.get("form") as FormArray;
    this.form.push(this.initAssessment());
    console.log(this.form.value);
  }

  removeAssessment(ind: number) {
    this.form.removeAt(ind);
  }

  async openUploadSheet(formNumber: number) {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant("APPLYFORM.uploadSheetHeader"),
      buttons: [
        {
          text: this.translate.instant("APPLYFORM.uploadSheetCamera"),
          role: "destructive",
          icon: "camera",
          handler: () => {
            console.log("Camera opened");
            this.openCamera(formNumber);
          },
        },
        {
          text: this.translate.instant("APPLYFORM.uploadSheetGallery"),
          icon: "images",
          handler: () => {
            console.log("Gallery opened");
            this.openGallery(formNumber);
          },
        },
        {
          text: this.translate.instant("APPLYFORM.cancelButton"),
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

  openCamera(formNumber: number) {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.tempImageData[formNumber] = imageData;
        //this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
        this.encodeFile64(formNumber);
      },
      (err) => {
        // Handle error
        alert("error " + JSON.stringify(err));
      }
    );
  }

  openGallery(formNumber: number): void {
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
        this.tempImageData[formNumber] = file_uri;
        this.encodeFile64(formNumber);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  encodeFile64(formNumber: number) {
    this.base64.encodeFile(this.tempImageData[formNumber]).then(
      (base64File: string) => {
        this.tempImageEncoded[formNumber] = base64File;
        this.formGroup.value.form[formNumber].supporting_doc =
          this.tempImageEncoded[formNumber];
        console.log(this.tempImageEncoded[formNumber]);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  submitApplication() {
    this.applicationForm.patchValue({
      date_submitted: moment().format("YYYY-MM-DD"),
      past_application: this.past_application,
      past_application_number: this.past_application_number,
    });
    this.applicationService.create(this.applicationForm.value).subscribe(
      (data) => {
        this.tempApplication = data;
        let body = {
          title: "Created",
          message: "Your application was successfully submitted",
          date_sent: moment().format("YYYY-MM-DD"),
          to_user: this.authService.userID,
        };
        this.notificationService.register(body).subscribe(
          (res) => {
            // console.log("res", res);
          },
          (err) => {
            console.error("err", err);
          }
        );
        this.submitAssessment();
      },
      () => {
        this.notifyService.openToastrError(
          this.translate.instant("APPLYFORM.unsuccessMessage")
        );
      },
      () => {}
    );
  }

  submitAssessment() {
    console.log(this.formGroup);
    this.formGroup.value.form.forEach((singleForm, ind, arr) => {
      //element.supporting_doc = this.imageSrc[calc]
      singleForm.application = this.tempApplication.id;
      this.applicationAssessmentService.create(singleForm).subscribe(
        () => {
          //this.presentToast()
          this.applicationAssessmentService.get().subscribe();
        },
        () => {
          this.notifyService.openToastrError(
            this.translate.instant("APPLYFORM.unsuccessMessage")
          );
        },
        () => {
          if (ind === arr.length - 1) {
            this.notifyService.openToastr(
              this.translate.instant("APPLYFORM.successMessage")
            );
            this.formGroup.reset();
            this.applicationForm.reset();
            this.router.navigate(["/applicant/home"]);
          }
        }
      );
    });
  }

  async confirmationAlert() {
    const alert = await this.alertController.create({
      header: this.translate.instant("APPLYFORM.confirmHeader"),
      message: this.translate.instant("APPLYFORM.confirmMessage"),
      buttons: [
        {
          text: this.translate.instant("APPLYFORM.cancelButton"),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: this.translate.instant("APPLYFORM.confirmButton"),
          handler: () => {
            this.submitApplication();
            //this.router.navigate(['/applicant/house-add-new'])
          },
        },
      ],
    });

    await alert.present();
  }

  calculateA3(index, formArray) {
    this.formGroup.value.form[index].energy_saving =
      (this.formGroup.value.form[index].total_led /
        (this.formGroup.value.form[index].total_lamp +
          this.formGroup.value.form[index].total_led)) *
      100;

    formArray.patchValue({
      total_led: this.formGroup.value.form[index].total_led,
      total_lamp: this.formGroup.value.form[index].total_lamp,
      energy_saving: this.formGroup.value.form[index].energy_saving,
    });
  }

  calculateConsumption() {
    let averagelectricity =
      (this.tempSelectedHouse.electricity_bill_1_usage +
        this.tempSelectedHouse.electricity_bill_2_usage +
        this.tempSelectedHouse.electricity_bill_3_usage) /
      3;
    let averageWater =
      (this.tempSelectedHouse.water_bill_1_usage +
        this.tempSelectedHouse.water_bill_2_usage +
        this.tempSelectedHouse.water_bill_3_usage) /
      3;
    this.consumptionElectricity =
      averagelectricity / this.tempSelectedHouse.permanent_occupant;
    this.consumptionWater =
      (averageWater * 1000) / (this.tempSelectedHouse.permanent_occupant * 30);
  }

  changeAssessmentAspect(event, index, formArray) {
    let result = this.tempAssessmentAspects.find((obj) => {
      return obj.id == event.target.value;
    });
    if (result) {
      formArray.patchValue({
        assessment_name: result.name,
        assessment_type: result.aspect_type,
      });
    }
  }
}

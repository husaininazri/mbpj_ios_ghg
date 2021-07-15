import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormGroup, FormControl, Validators } from "@angular/forms";
import * as moment from "moment";
import { ToastController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ApplicationsService } from "src/app/shared/services/applications/applications.service";
import { ApplicationAssessmentsService } from "src/app/shared/services/application-assessments/application-assessments.service";
import { AssessmentAspectsService } from "src/app/shared/services/assessment-aspects/assessment-aspects.service";
import { EvaluationsService } from "src/app/shared/services/evaluations/evaluations.service";
import { HousesService } from "src/app/shared/services/houses/houses.service";
//import { ApplicationEvaluationsService } from 'src/app/shared/services/application-evaluations/application-evaluations.service';
import { Camera } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-evaluate",
  templateUrl: "./evaluate.component.html",
  styleUrls: ["./evaluate.component.scss"],
})
export class EvaluateComponent implements OnInit {
  isConfirm: boolean = false;

  panelOpenState: boolean = false;

  evaluationFormArray = new FormArray([]);
  a1Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "be6ef279-0439-4da3-b1ee-c29396dc7404"
    ),
  });
  a2Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "425ca387-702e-4972-86ff-69ebed10d45a"
    ),
  });
  a3Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "9c18a34e-21d9-4b1d-88c1-f3d19b5bfbe2"
    ),
  });
  a4Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "7fa64288-0d73-4593-b1d8-4b47a448c273"
    ),
  });
  a5Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "b23d0e1d-9bab-49b7-b755-ca70ffa2722f"
    ),
  });
  a6Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "f651cbd1-03b3-49f1-9cba-892b9dd9285a"
    ),
  });
  b1Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "6e055614-c429-4051-b6da-ed96246aabd6"
    ),
  });
  b2Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "75bebeee-3233-46d7-ad20-4e7deb43d10f"
    ),
  });
  b3Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "4391e0e3-52dd-4d70-9697-b80329681d5e"
    ),
  });
  b4Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "49c98768-c26e-40bb-86c1-d82c645dc0d5"
    ),
  });
  b5Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "0eeb7912-4be7-4e4a-99f5-e97c4a7fbae2"
    ),
  });
  c1Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "be6ef279-0439-4da3-b1ee-c29396dc7404"
    ),
  });
  c2Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "425ca387-702e-4972-86ff-69ebed10d45a"
    ),
  });
  c3Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "9c18a34e-21d9-4b1d-88c1-f3d19b5bfbe2"
    ),
  });
  c4Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "7fa64288-0d73-4593-b1d8-4b47a448c273"
    ),
  });
  d1Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "49c98768-c26e-40bb-86c1-d82c645dc0d5"
    ),
  });
  d2Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "0eeb7912-4be7-4e4a-99f5-e97c4a7fbae2"
    ),
  });
  e1Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "49c98768-c26e-40bb-86c1-d82c645dc0d5"
    ),
  });
  e2Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "0eeb7912-4be7-4e4a-99f5-e97c4a7fbae2"
    ),
  });
  e3Form = new FormGroup({
    //id: new FormControl(''),
    application_id: new FormControl(""),
    equipment: new FormControl(""),
    system: new FormControl(""),
    efficiency: new FormControl(""),
    remarks: new FormControl(""),
    application_assessment: new FormControl(
      "0eeb7912-4be7-4e4a-99f5-e97c4a7fbae2"
    ),
  });

  totalA1: number = 0;
  totalA2: number = 0;
  totalA3: number = 0;
  totalA4: number = 0;
  totalA5: number = 0;
  totalA6: number = 0;
  totalB1: number = 0;
  totalB2: number = 0;
  totalB3: number = 0;
  totalB4: number = 0;
  totalB5: number = 0;
  totalC1: number = 0;
  totalC2: number = 0;
  totalC3: number = 0;
  totalC4: number = 0;
  totalD1: number = 0;
  totalD2: number = 0;
  totalE1: number = 0;
  totalE2: number = 0;
  totalE3: number = 0;

  totalAll: number = 0; // new

  totalEligibleA: number;
  totalEligibleB: number;
  totalEligibleC: number;
  totalEligibleD: number;
  totalEligibleE: number;

  equipmentA: number;
  systemA: number;
  efficiencyA: number;
  equipmentB: number;
  systemB: number;
  efficiencyB: number;
  equipmentC: number;
  systemC: number;
  efficiencyC: number;
  equipmentD: number;
  systemD: number;
  efficiencyD: number;
  equipmentE: number;
  systemE: number;
  efficiencyE: number;

  slidesOptions = {
    initialSlide: 0,
    speed: 400,
  };

  tempApplication;
  tempAssessment;
  tempHouse;
  tempApplicant;
  tempApplicationAssessment = [];
  tempAssessmentAspect = [];

  imageSrc;

  aspectTypes = [
    {
      value: "EN",
      display_name: "Energy",
    },
    {
      value: "WA",
      display_name: "Water",
    },
    {
      value: "TR",
      display_name: "Transportation",
    },
    {
      value: "BI",
      display_name: "Biodiversity",
    },
    {
      value: "WE",
      display_name: "Waste",
    },
  ];

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    private applicationAssessmentService: ApplicationAssessmentsService,
    private assessmentAspectService: AssessmentAspectsService,
    private evaluationService: EvaluationsService,
    private houseService: HousesService,
    private camera: Camera,

    public alertController: AlertController,
    public router: Router,
    public toastr: ToastController
  ) {
    this.tempAssessmentAspect =
      this.assessmentAspectService.retrievedAssessmentAspects;
    this.tempApplication = this.router.getCurrentNavigation().extras;
  }

  initEvaluation() {
    return new FormGroup({
      equipment: new FormControl(0, [Validators.min(0), Validators.max(30)]),
      system: new FormControl(0, [Validators.min(0), Validators.max(30)]),
      efficiency: new FormControl(0, [Validators.min(0), Validators.max(40)]),
      remarks: new FormControl(""),
      application_assessment: new FormControl(""),
      assessment_aspect_name: new FormControl(""),
      incentive: new FormControl(0),
      total_evaluation: new FormControl(0),
    });
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.houseService.houses.forEach((data) => {
      if (data.id == this.tempApplication.applied_house) {
        this.tempHouse = data;
      }
    });

    this.authService.users.forEach((data) => {
      if (data.id == this.tempHouse.applicant) {
        this.tempApplicant = data;
      }
    });

    this.applicationAssessmentService
      .filter("application=" + this.tempApplication.id)
      .subscribe((res) => {
        this.tempApplicationAssessment = res;
        this.tempApplicationAssessment.forEach((objTempAppAss, index) => {
          let result = this.tempAssessmentAspect.find((objTempAssAsp) => {
            return objTempAssAsp.id == objTempAppAss.assessment_aspect;
          });
          this.tempApplicationAssessment[index].assessment_aspect_name =
            this.getAspectType(result.aspect_type) +
            " - " +
            result.name +
            " " +
            result.aspect +
            ` (${result.incentive}%)`;

          this.evaluationFormArray.push(this.initEvaluation());
          if (this.evaluationFormArray.length > 0)
            this.evaluationFormArray.at(index).patchValue({
              application_assessment: objTempAppAss.id,
              assessment_aspect_name:
                result.name +
                ". " +
                this.getAspectType(result.aspect_type) +
                " - " +
                result.aspect +
                ` (${result.incentive}%)`,
              incentive: result.incentive,
            });
        });
      });
  }

  getAspectType(value: string) {
    let result = this.aspectTypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }

  changeEvaluation() {
    this.totalA1 =
      ((this.a1Form.value.equipment +
        this.a1Form.value.system +
        this.a1Form.value.efficiency) /
        100) *
      20;
    this.totalA2 =
      ((this.a2Form.value.equipment +
        this.a2Form.value.system +
        this.a2Form.value.efficiency) /
        100) *
      20;
    this.totalA3 =
      ((this.a3Form.value.equipment +
        this.a3Form.value.system +
        this.a3Form.value.efficiency) /
        100) *
      20;
    this.totalA4 =
      ((this.a4Form.value.equipment +
        this.a4Form.value.system +
        this.a4Form.value.efficiency) /
        100) *
      20;
    this.totalA5 =
      ((this.a5Form.value.equipment +
        this.a5Form.value.system +
        this.a5Form.value.efficiency) /
        100) *
      20;
    this.totalA6 =
      ((this.a6Form.value.equipment +
        this.a6Form.value.system +
        this.a6Form.value.efficiency) /
        100) *
      25;

    this.totalB1 =
      ((this.b1Form.value.equipment +
        this.b1Form.value.system +
        this.b1Form.value.efficiency) /
        100) *
      20;
    this.totalB2 =
      ((this.b2Form.value.equipment +
        this.b2Form.value.system +
        this.b2Form.value.efficiency) /
        100) *
      20;
    this.totalB3 =
      ((this.b3Form.value.equipment +
        this.b3Form.value.system +
        this.b3Form.value.efficiency) /
        100) *
      25;
    this.totalB4 =
      ((this.b4Form.value.equipment +
        this.b4Form.value.system +
        this.b4Form.value.efficiency) /
        100) *
      20;
    this.totalB5 =
      ((this.b5Form.value.equipment +
        this.b5Form.value.system +
        this.b5Form.value.efficiency) /
        100) *
      20;

    this.totalC1 =
      ((this.c1Form.value.equipment +
        this.c1Form.value.system +
        this.c1Form.value.efficiency) /
        100) *
      25;
    this.totalC2 =
      ((this.c2Form.value.equipment +
        this.c2Form.value.system +
        this.c2Form.value.efficiency) /
        100) *
      25;
    this.totalC3 =
      ((this.c3Form.value.equipment +
        this.c3Form.value.system +
        this.c3Form.value.efficiency) /
        100) *
      25;
    this.totalC4 =
      ((this.c4Form.value.equipment +
        this.c4Form.value.system +
        this.c4Form.value.efficiency) /
        100) *
      25;

    this.totalD1 =
      ((this.d1Form.value.equipment +
        this.d1Form.value.system +
        this.d1Form.value.efficiency) /
        100) *
      20;
    this.totalD2 =
      ((this.d2Form.value.equipment +
        this.d2Form.value.system +
        this.d2Form.value.efficiency) /
        100) *
      20;

    this.totalE1 =
      ((this.e1Form.value.equipment +
        this.e1Form.value.system +
        this.e1Form.value.efficiency) /
        100) *
      20;
    this.totalE2 =
      ((this.e2Form.value.equipment +
        this.e2Form.value.system +
        this.e2Form.value.efficiency) /
        100) *
      20;
    this.totalE3 =
      ((this.e3Form.value.equipment +
        this.e3Form.value.system +
        this.e3Form.value.efficiency) /
        100) *
      20;

    let sumA =
      this.totalA1 +
      this.totalA2 +
      this.totalA3 +
      this.totalA4 +
      this.totalA5 +
      this.totalA6;
    let sumB =
      this.totalB1 + this.totalB2 + this.totalB3 + this.totalB4 + this.totalB5;
    let sumC = this.totalC1 + this.totalC2 + this.totalC3 + this.totalC4;
    let sumD = this.totalD1 + this.totalD2;
    let sumE = this.totalE1 + this.totalE2 + this.totalE3;
    this.totalAll = sumA + sumB + sumC + sumD + sumE;

    // this.isConfirm = true;

    this.evaluationFormArray.controls.forEach((formarray, index) => {
      let total_evaluation =
        ((formarray.value.equipment +
          formarray.value.system +
          formarray.value.efficiency) /
          100) *
        formarray.value.incentive;
      this.evaluationFormArray.at(index).patchValue({
        total_evaluation,
      });
      this.totalAll += total_evaluation;
    });
  }

  previewEvaluation() {
    this.isConfirm = true;
  }

  backToEvaluation() {
    this.isConfirm = false;
  }

  async successfulToast() {
    console.log("successfultoast");
    const toast = await this.toastr.create({
      message: "Submit evaluation successful",
      duration: 4000,
      position: "top",
      color: "primary",
    });
    toast.present();
  }

  async unsuccessfulToast() {
    const toast = await this.toastr.create({
      message: "Submit evaluation unsuccessful",
      duration: 3000,
      position: "top",
      color: "danger",
    });
    toast.present();
  }

  selectAttachment(): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };

    this.camera.getPicture(cameraOptions).then(
      (file_uri) => {
        this.imageSrc = "data:image/jpeg;base64," + file_uri;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async doSubmit() {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Confirm to send the evaluation?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Confirm",
          handler: () => {
            this.evaluationService
              .create(this.evaluationFormArray.value)
              .subscribe(
                (res) => {
                  // console.log("res", res);
                  if (res.length > 0) {
                    let body = {
                      status: "SM",
                    };
                    this.applicationService
                      .assign(body, this.tempApplication.id)
                      .subscribe(
                        (res) => {
                          // console.log("res", res);
                        },
                        (err) => {
                          console.error("err", err);
                        }
                      );
                    this.successfulToast();
                    this.router.navigate(["/evaluator/home"]);
                  }
                },
                (err) => {
                  console.log("err", err);
                  this.unsuccessfulToast();
                }
              );
          },
        },
      ],
    });
    await alert.present();
  }
}

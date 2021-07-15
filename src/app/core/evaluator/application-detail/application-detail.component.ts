import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
//import { ApplicationEvaluationSchedulesService } from 'src/app/shared/services/application-evaluation-schedules/application-evaluation-schedules.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApplicationsService } from 'src/app/shared/services/applications/applications.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Application } from 'src/app/shared/services/applications/applications.model';
import { House } from 'src/app/shared/services/houses/houses.model';
import { HousesService } from 'src/app/shared/services/houses/houses.service';
import { User } from 'src/app/shared/services/auth/auth.model';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss'],
})
export class ApplicationDetailComponent implements OnInit {

  session_type = [
    { value: 'AM', text: 'Morning' },
    { value: 'PM', text: 'Evening'}
  ]

  evaluationForm = new FormGroup({
    application_id: new FormControl(''),
    date: new FormControl(''),
    session: new FormControl('')
  })

  public tempApplication
  public tempHouse: House
  public tempApplicant: User

  public loadingMessage: HTMLIonLoadingElement

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    //private applicationEvaluationScheduleService: ApplicationEvaluationSchedulesService,
    private houseService: HousesService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    public toastController: ToastController
  ) { 
    this.tempApplication = this.router.getCurrentNavigation().extras
    console.log(this.tempApplication)
    this.initData()
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.initData()
  }

  initData(){
    this.houseService.houses.forEach(
      (data)=>{
        if(this.tempApplication.applied_house == data.id){
          this.tempHouse = data
        }
      }
    )
    this.authService.users.forEach(
      (data) => {
        if (this.tempApplication.applicant == data.id){
          this.tempApplicant = data
        }
      }
    )
  }

  async doSetEvaluation(){
    
    this.loadingMessage = await this.loadingController.create({
      message: 'Loading...'
    });
    await this.loadingMessage.present();

    this.evaluationForm.value.application_id = this.tempApplication.id
    let formatedDate: string = moment(new Date(this.evaluationForm.value.date)).format("YYYY-MM-DD")
    this.evaluationForm.value.date = formatedDate
    console.log(formatedDate)
    /*this.applicationEvaluationScheduleService.doCreateApplicationEvaluationSchedule(this.evaluationForm.value).subscribe(
      () => {
        this.successfulToast()
      },
      () => {
        this.unsuccessfulToast()
      },
      () => {
        this.loadingMessage.dismiss()
      }
    )*/
  }

  async successfulToast() {
    const toast = await this.toastController.create({
      message: 'Set appointment successful',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async unsuccessfulToast() {
    const toast = await this.toastController.create({
      message: 'Set appointment unsuccessful',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}

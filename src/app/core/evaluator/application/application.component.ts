import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApplicationsService } from 'src/app/shared/services/applications/applications.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Application, MergedApplication } from 'src/app/shared/services/applications/applications.model';
import { House } from 'src/app/shared/services/houses/houses.model';
import { HousesService } from 'src/app/shared/services/houses/houses.service';
import { User } from 'src/app/shared/services/auth/auth.model';
import { EvaluationSchedulesService } from 'src/app/shared/services/evaluation-schedules/evaluation-schedules.service';
import { EvaluationSchedule } from 'src/app/shared/services/evaluation-schedules/evaluation-schedules.model';
import * as moment from 'moment';

class MergedNominatedApplication {
  public id: string
  public applicant: string
  public evaluator_nominated: string
  public applied_house: string
  public status: string
  public date_submitted: string
  public applied_house_address: string
  public applicant_full_name: string
  public schedule_date: string
  public schedule_session: string

  constructor(
    id: string,
    applicant: string,
    evaluator_nominated: string,
    applied_house: string,
    status: string,
    date_submitted: string,
    applied_house_address: string,
    applicant_full_name: string,
    schedule_date: string,
    schedule_session: string
  ){
    this.id = id
    this.applicant = applicant
    this.evaluator_nominated = evaluator_nominated
    this.applied_house = applied_house
    this.status = status
    this.date_submitted = date_submitted
    this.applied_house_address = applied_house_address
    this.applicant_full_name = applicant_full_name
    this.schedule_date = schedule_date
    this.schedule_session = schedule_session
  }
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {

  public imgScheduleThumbnail = 'assets/icon/results.svg'

  public isGotApplication: boolean = false
  public imgNotFound = 'assets/icon/error-404.svg'

  public loadedNominatedApplications: Application[] = []
  public loadedNominatedHouses: House[] = []
  public loadedNominatedApplicant: User[] = []
  public loadedNominatedSchedule: EvaluationSchedule[] = []

  public mergedNominatedApplications: MergedNominatedApplication[] = []

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    private evaluationScheduleService: EvaluationSchedulesService,
    private houseService: HousesService,
    public alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadedNominatedApplications = this.applicationService.applicationsEvaluatorNominated
    if (this.loadedNominatedApplications.length != 0){
      this.isGotApplication = true
    }
    this.loadedNominatedApplications.forEach(
      (application) => {
        application.date_submitted = moment(application.date_submitted, 'YYYY-MM-DD').format('DD-MM-YYYY')
      }
    )
  }

  ionViewDidEnter(){
    this.mergedNominatedApplications = []
    this.loadedNominatedHouses = []
    this.loadedNominatedApplications = this.applicationService.applicationsEvaluatorNominated
    //this.loadedNominatedHouses = this.houseService.retrievedHouses
    this.loadedNominatedApplications.forEach(
      (application) => {
        this.houseService.houses.forEach(
          (house) => {
            if(application.applied_house == house.id){
              if (application.status == 'IE'){
                //this.loadedNominatedHouses.push(house)
                //console.log(this.loadedNominatedHouses)
                this.authService.users.forEach(
                  (applicant) => {
                    if (applicant.id == application.applicant){
                      //this.loadedNominatedApplicant.push(applicant)
                      this.evaluationScheduleService.schedules.forEach(
                        (schedule) => {
                          if (schedule.application == application.id) {
                            //this.loadedNominatedSchedule.push(schedule)
                            this.mergedNominatedApplications.push({
                              id: application.id,
                              applicant: application.applicant,
                              evaluator_nominated: application.evaluator_nominated,
                              applied_house: application.applied_house,
                              status: application.status,
                              date_submitted: application.date_submitted,
                              applied_house_address: house.address,
                              applicant_full_name: applicant.full_name,
                              schedule_date: schedule.date,
                              schedule_session: schedule.session
                            })
                          }
                        }
                      )
                    }
                  }
                )
              }
            }
          }
        )
      }
    )

  }

  doStartEvaluate(application_id){
    let application
    this.loadedNominatedApplications.forEach(
      (data) => {
        if (data.id == application_id){
          application = data
        }
      }
    )
    this.router.navigate(['/evaluator/evaluate'], application)
  }
  
}

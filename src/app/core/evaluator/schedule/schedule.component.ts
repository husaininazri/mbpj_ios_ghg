import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Application } from 'src/app/shared/services/applications/applications.model';
import { House } from 'src/app/shared/services/houses/houses.model';
import { User } from 'src/app/shared/services/auth/auth.model';
import { ApplicationsService } from 'src/app/shared/services/applications/applications.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HousesService } from 'src/app/shared/services/houses/houses.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  public imgScheduleThumbnail = 'assets/icon/results.svg'

  public isGotApplication: boolean = false
  public imgNotFound = 'assets/icon/error-404.svg'

  public loadedNominatedApplications: Application[] = []
  public loadedNominatedHouses: House[] = []
  public loadedNominatedApplicant: User[] = []

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    private houseService: HousesService,
    public alertController: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadedNominatedApplications = this.applicationService.applicationsEvaluatorNominatedCurrent
    if (this.loadedNominatedApplications.length != 0){
      this.isGotApplication = true
    }
    this.initData()
  }

  initData() {
    this.loadedNominatedHouses = []
    this.loadedNominatedApplications = this.applicationService.applicationsEvaluatorNominatedCurrent
    //this.loadedNominatedHouses = this.houseService.retrievedHouses
    this.loadedNominatedApplications.forEach(
      (application) => {
        this.houseService.houses.forEach(
          (house) => {
            if(application.applied_house == house.id){
              this.loadedNominatedHouses.push(house)
              console.log(this.loadedNominatedHouses)
            }
          }
        )
        this.authService.users.forEach(
          (applicant) => {
            if (applicant.id == application.applicant){
              this.loadedNominatedApplicant.push(applicant)
            }
          }
        )
      }
    )
  }

  async doConfirmLogout(){
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.router.navigate(['/auth/login'])
          }
        }
      ]
    });

    await alert.present();
  }

  setDate(house){
    console.log(house)
    let application
    this.loadedNominatedApplications.forEach(
      (data) => {
        if (data.applied_house == house.id){
          application = data
        }
      }
    )
    this.router.navigate(['/evaluator/application-detail'], application)
  }

}

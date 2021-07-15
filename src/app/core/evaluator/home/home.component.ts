import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApplicationsService } from 'src/app/shared/services/applications/applications.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Application } from 'src/app/shared/services/applications/applications.model';
import { House } from 'src/app/shared/services/houses/houses.model';
import { HousesService } from 'src/app/shared/services/houses/houses.service';
import { User } from 'src/app/shared/services/auth/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  // Image
  imgScheduleThumbnail = 'assets/icon/results.svg'
  imgNotFound = 'assets/icon/error-404.svg'
  
  // Check
  isGotApplication: boolean = false

  applications: Application[] = []
  houses: House[] = []
  applicants: User[] = []
  
  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    private houseService: HousesService,
    private alertCtrl: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
  }

  setDate(house){
    console.log(house)
    let application
    this.applications.forEach(
      (data) => {
        if (data.applied_house == house.id){
          application = data
        }
      }
    )
    this.router.navigate(['/evaluator/application-detail'], application)
  }

}

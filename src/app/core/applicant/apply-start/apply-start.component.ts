import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

import { ApplicationsService } from "src/app/shared/services/applications/applications.service";
import { House } from "src/app/shared/services/houses/houses.model";
import { HousesService } from "src/app/shared/services/houses/houses.service";

import { TranslateService } from "@ngx-translate/core";

import * as moment from "moment";

@Component({
  selector: "app-apply-start",
  templateUrl: "./apply-start.component.html",
  styleUrls: ["./apply-start.component.scss"],
})
export class ApplyStartComponent implements OnInit {
  // Image
  imgApplyBanner = "assets/icon/green-city.svg";
  imgHouseThumbnail = "assets/icon/house.svg";

  // Check
  isStartApplication: boolean = false;
  isApplied: boolean = false;

  // Data
  houses: House[];

  // Slider
  slidesOptions = {
    initialSlide: 0,
    speed: 400,
  };

  constructor(
    private applicationService: ApplicationsService,
    private houseService: HousesService,
    private alertCtrl: AlertController,
    private router: Router,
    public translate: TranslateService
  ) {
    this.houses = this.houseService.housesFiltered;
  }

  ngOnInit() {
    // console.log(this.houses)
  }

  selectHouse(house) {
    // restrict user to apply form more than one in current year
    let body = {
      year: moment().format("YYYY"),
      house: house.id,
    };
    this.applicationService.get_filter_one_application_per_year(body).subscribe(
      async (res) => {
        if (res > 0) {
          const alert = await this.alertCtrl.create({
            header: this.translate.instant("APPLY.restrictOneHeader"),
            message:
              this.translate.instant("APPLY.restrictOneMessage") +
              house.address +
              ", " +
              house.postcode +
              " " +
              house.area,
            buttons: ["OK"],
          });

          await alert.present();
        } else {
          const alert = await this.alertCtrl.create({
            header: this.translate.instant("APPLY.confirmHeader"),
            message: this.translate.instant("APPLY.confirmMessage"),
            buttons: [
              {
                text: this.translate.instant("APPLY.confirmCancelButton"),
                role: "cancel",
                cssClass: "secondary",
                handler: (blah) => {},
              },
              {
                text: this.translate.instant("APPLY.confirmButton"),
                handler: () => {
                  this.router.navigate(["/applicant/apply-form"], house);
                },
              },
            ],
          });

          await alert.present();
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  startApply() {
    this.isStartApplication = true;
  }

  /*
  async confirmHouseAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'You can only apply for one house per year. Do you wish to continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm, please proceed',
          handler: () => {
            //this.doStartApplication(house)
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }*/
}

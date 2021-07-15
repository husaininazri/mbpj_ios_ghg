import { Component, OnInit } from "@angular/core";
import { Application } from "src/app/shared/services/applications/applications.model";
import { ApplicationsService } from "src/app/shared/services/applications/applications.service";
import { Router, NavigationExtras } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { HousesService } from "src/app/shared/services/houses/houses.service";
import { House } from "src/app/shared/services/houses/houses.model";
import * as moment from "moment";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  // Check
  isGotHistory: boolean = false;

  // Image
  imgNotFound = "assets/icon/error-404.svg";
  imgHistoryThumbnail = "assets/icon/results.svg";

  // Data
  applications: Application[] = [];
  houses: House[] = [];

  constructor(
    private applicationService: ApplicationsService,
    private houseService: HousesService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    // this.applications = this.applicationService.applicationsApplicantPast
    this.getData();
  }

  ngOnInit() {
    if (this.applications.length != 0) {
      this.isGotHistory = true;
    }
  }

  getData() {
    this.applicationService.getApplicantDetail().subscribe(
      (res) => {
        this.applications = res;
      },
      (err) => {
        console.error("err", err);
      }
    );

    this.applications.forEach((application) => {
      application.date_submitted = moment(
        application.date_submitted,
        "YYYY-MM-DD"
      ).format("DD-MM-YYYY");
      this.houseService.housesApplicant.forEach((house) => {
        if (house.id == application.applied_house) {
          this.houses.push(house);
        }
      });
    });
  }

  clickHistoryView(application) {
    let navigationExtras: NavigationExtras = {
      state: {
        application
      }
    }
    this.router.navigate(['/applicant/history-view'], navigationExtras)
  }
}

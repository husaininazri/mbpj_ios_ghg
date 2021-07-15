import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { House } from "src/app/shared/services/houses/houses.model";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { HousesService } from "src/app/shared/services/houses/houses.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-house",
  templateUrl: "./house.component.html",
  styleUrls: ["./house.component.scss"],
})
export class HouseComponent implements OnInit {
  // Check
  isGotHouse: boolean = false;

  // Image
  imgNotFound = "assets/icon/error-404.svg";
  imgHouseThumbnail = "assets/icon/house.svg";

  houses: House[]; //= this.houseService.retrievedApplicantHouse

  constructor(
    private router: Router,
    private authService: AuthService,
    private houseService: HousesService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.houses = this.houseService.housesFiltered;
    if (this.houses.length != 0) {
      this.isGotHouse = true;
    }
    console.log("ngOnInit");
  }

  ionViewDidEnter() {
    this.houseService.filter("applicant=" + this.authService.userID).subscribe(
      (res) => {
        this.houses = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
    console.log("ionViewDidEnter", this.houses);
  }

  addNewHouse() {
    console.log("Clicked add new house");
    this.router.navigate(["/applicant/house-add-new"]);
  }

  viewHouseDetail(event) {
    console.log("Clicked view house", event);
    this.router.navigate(["/applicant/house-detail"], event);
  }
}

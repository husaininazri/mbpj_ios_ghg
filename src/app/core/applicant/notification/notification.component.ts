import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotificationsService } from "src/app/shared/services/notifications/notifications.service";

import * as moment from "moment";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit {
  // Check
  isGotNotification: boolean = false;

  // Image
  imgNotFound = "assets/icon/error-404.svg";
  imgNotiThumbnail = "assets/icon/faq.svg";

  // Data
  notifications = [];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.notificationService.getUser(this.authService.userID).subscribe(
      (res) => {
        // console.log("res", res);
        this.notifications = res;
        this.notifications.forEach((notification) => {
          notification.date_sent = moment(
            notification.date_sent,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY");
        });
        if (this.notifications.length > 0) this.isGotNotification = true;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }
}

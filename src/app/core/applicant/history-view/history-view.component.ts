import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

import { ApplicationAssessmentsService } from "src/app/shared/services/application-assessments/application-assessments.service";
import { AssessmentAspectsService } from "src/app/shared/services/assessment-aspects/assessment-aspects.service";
import { EvaluationsService } from "src/app/shared/services/evaluations/evaluations.service";

@Component({
  selector: "app-history-view",
  templateUrl: "./history-view.component.html",
  styleUrls: ["./history-view.component.scss"],
})
export class HistoryViewComponent implements OnInit {
  // Data
  application = [];
  assessmentaspects;

  // Dropdown
  aspecttypes = [
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
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private applicationassessmentService: ApplicationAssessmentsService,
    private assessmentaspectService: AssessmentAspectsService,
    private evaluationService: EvaluationsService
  ) {
    // To get all assessment aspects
    this.assessmentaspects =
      this.assessmentaspectService.retrievedAssessmentAspects;

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.application.push(
          this.router.getCurrentNavigation().extras.state.application
        );
        console.log("application", this.application);
      }
    });
  }

  ngOnInit() {}

  async doPrint() {
    const alert = await this.alertCtrl.create({
      header: "Confirm!",
      message: "You're about to download this application",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Download",
          handler: () => {
            console.log("Confirm Okay");
          },
        },
      ],
    });

    await alert.present();
  }

  getAspectType(value) {
    if (value) {
      let results = this.assessmentaspects.find((obj) => {
        return obj.id == value;
      });
      let result = this.aspecttypes.find((obj) => {
        return results.aspect_type == obj.value;
      });
      return (
        result.display_name + " - " + results.name + " (" + results.aspect + ")"
      );
    } else {
      return;
    }
  }
}

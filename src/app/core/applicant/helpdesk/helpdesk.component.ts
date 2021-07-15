import { Component, OnInit } from "@angular/core";
import {
  AlertController,
  ToastController,
  LoadingController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { TicketAnswersService } from "src/app/shared/services/ticket-answers/ticket-answers.service";
import { TicketQuestionsService } from "src/app/shared/services/ticket-questions/ticket-questions.service";
import { TicketQuestion } from "src/app/shared/services/ticket-questions/ticket-questions.model";
import { TicketAnswer } from "src/app/shared/services/ticket-answers/ticket-answers.model";
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";

@Component({
  selector: "app-helpdesk",
  templateUrl: "./helpdesk.component.html",
  styleUrls: ["./helpdesk.component.scss"],
})
export class HelpdeskComponent implements OnInit {
  // Data
  questions: TicketQuestion[] = [];
  answers: TicketAnswer[] = [];

  // Form
  ticketForm: FormGroup;

  // Loading
  loadingMessage: HTMLIonLoadingElement;

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private ticketAnswerService: TicketAnswersService,
    private ticketQuestionService: TicketQuestionsService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.ticketForm = this.formBuilder.group({
      question: new FormControl(""),
      status: new FormControl("UR"),
      date_submitted: new FormControl(""),
      submitted_by: new FormControl(""),
    });

    this.refreshData();
  }

  async submitQuestion() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant("HELPDESK.confirmHeader"),
      message: this.translate.instant("HELPDESK.confirmMessage"),
      buttons: [
        {
          text: this.translate.instant("HELPDESK.cancelButton"),
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            // console.log("Confirm Cancel: blah");
          },
        },
        {
          text: this.translate.instant("HELPDESK.confirmButton"),
          handler: () => {
            // console.log("Confirm Okay");
            this.onConfirm();
          },
        },
      ],
    });

    await alert.present();
  }

  async onConfirm() {
    this.ticketForm.value.date_submitted = moment().format("YYYY-MM-DD");
    this.ticketForm.value.submitted_by = this.authService.userID;
    //console.log(this.ticketForm.value)
    this.loadingMessage = await this.loadingCtrl.create({
      message: "Loading...",
    });

    await this.loadingMessage.present();

    this.ticketQuestionService.create(this.ticketForm.value).subscribe(
      () => {
        this.loadingMessage.dismiss();
        this.successfulToast();
      },
      () => {
        this.loadingMessage.dismiss();
        this.unsuccessfulToast();
      },
      () => {
        this.refreshData();
        this.ticketForm.reset();
      }
    );
  }

  refreshData() {
    this.questions = [];
    this.answers = [];
    this.ticketQuestionService
      .filter("submitted_by=" + this.authService.userID)
      .subscribe((res) => {
        // console.log("question", res);
        this.questions = res;
        this.questions.forEach((question) => {
          question.date_submitted = moment(
            question.date_submitted,
            "YYYY-MM-DD"
          ).format("DD-MM-YYYY");
          this.ticketAnswerService
            .filter("question_id=" + question.id)
            .subscribe(
              (res) => {
                // console.log("answer", res);
                this.answers.push(res[0]);
              },
              (err) => {
                console.error("err", err);
              }
            );
        });
      });
  }

  async successfulToast() {
    const toast = await this.toastController.create({
      message: this.translate.instant("HELPDESK.successMessage"),
      position: "top",
      duration: 3000,
      color: "primary",
    });
    toast.present();
  }

  async unsuccessfulToast() {
    const toast = await this.toastController.create({
      message: this.translate.instant("HELPDESK.unsuccessMessage"),
      position: "top",
      duration: 3000,
      color: "danger",
    });
    toast.present();
  }
}

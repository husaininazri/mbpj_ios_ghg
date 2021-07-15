import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApplicationsService } from 'src/app/shared/services/applications/applications.service';
import { ApplicationAssessmentsService } from 'src/app/shared/services/application-assessments/application-assessments.service';
import { AssessmentAspectsService } from 'src/app/shared/services/assessment-aspects/assessment-aspects.service';
import { EvaluationSchedulesService } from 'src/app/shared/services/evaluation-schedules/evaluation-schedules.service';
import { EvaluationsService } from 'src/app/shared/services/evaluations/evaluations.service';
import { HousesService } from 'src/app/shared/services/houses/houses.service';
import { TicketAnswersService } from 'src/app/shared/services/ticket-answers/ticket-answers.service';
import { TicketQuestionsService } from 'src/app/shared/services/ticket-questions/ticket-questions.service';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';

@Component({
  selector: 'app-login-evaluator',
  templateUrl: './login-evaluator.component.html',
  styleUrls: ['./login-evaluator.component.scss'],
})
export class LoginEvaluatorComponent implements OnInit {

  // Loading
  loadingMessage: HTMLIonLoadingElement

  // Form
  loginForm: FormGroup
  loginFormMessage = {
    'username': [
      { type: 'required', message: 'Your NRIC/passport is required' },
      { type: 'minlength', message: 'NRIC must be 12 characters long.' },
      { type: 'maxlength', message: 'NRIC cannot be more than 12 characters long.' },
      { type: 'pattern', message: 'Please enter NRIC without (-)' },
      //{ type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minLength', message: 'Password is too short'}
    ]
  }

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    private applicationAssessmentService: ApplicationAssessmentsService,
    private assessmentAspectService: AssessmentAspectsService,
    private evaluationService: EvaluationsService,
    private evaluationScheduleService: EvaluationSchedulesService,
    private houseService: HousesService,
    private ticketAnswerService: TicketAnswersService,
    private ticketQuestionService: TicketQuestionsService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private notifyService: NotifyService,
    private router: Router
    
    //private applicationEvaluationService: ApplicationEvaluationsService,
    //private applicationEvaluationAssessmentService: ApplicationEvaluationAssessmentsService,
    //private applicationEvaluationScheduleService: ApplicationEvaluationsService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
  }

  async login() {
    // console.log(this.loginForm)
    this.loadingMessage = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await this.loadingMessage.present();

    this.authService.obtainToken(this.loginForm.value).subscribe(
      () => {
        // console.log('Accepted')
      },
      () => {
        // console.log('Rejected')
        this.loadingMessage.dismiss()
      },
      () => {
        // console.log('After that')
        if (this.authService.userType == "EV"){
          this.fetchData()
        }
        else {
          //console.log('Salah type')
          this.loadingMessage.dismiss()
          let message = 'Not authorized'
          this.notifyService.openToastrError(message)
        }
      }
    )
  }

  fetchData() {
    let message = 'Welcome back!'
    this.applicationService.getApplicant(this.authService.userID).subscribe(
      () => {},
      () => {
        this.loadingMessage.dismiss()
      },
      () => {
        this.notifyService.openToastr(message)
        this.loadingMessage.dismiss()
        this.router.navigate(['/evaluator/home'])
      }
    )
    this.applicationAssessmentService.get().subscribe()
    this.assessmentAspectService.get().subscribe()
    this.evaluationService.get().subscribe()
    this.evaluationScheduleService.get().subscribe()
    this.houseService.getUser(this.authService.userID).subscribe()
    this.ticketAnswerService.getUser(this.authService.userID).subscribe()
    this.ticketQuestionService.getUser(this.authService.userID).subscribe()
    this.applicationService.getEvaluator(this.authService.userID).subscribe()
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApplicationsService } from 'src/app/shared/services/applications/applications.service';
import { HousesService } from 'src/app/shared/services/houses/houses.service';
import { TicketQuestionsService } from 'src/app/shared/services/ticket-questions/ticket-questions.service';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';

@Component({
  selector: 'app-login-applicant',
  templateUrl: './login-applicant.component.html',
  styleUrls: ['./login-applicant.component.scss'],
})
export class LoginApplicantComponent implements OnInit {

  // Loading
  loadingMessage: HTMLIonLoadingElement

  // Form
  loginForm: FormGroup
  loginFormMessage = {
    'username': [
      { type: 'required', message: 'Your NRIC/passport is required' },
      { type: 'minlength', message: 'Passport must be 9 characters long' },
      { type: 'maxlength', message: 'NRIC cannot be more than 12 characters long' },
      // { type: 'pattern', message: 'Please enter NRIC/passport without (-)' },
      // { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password is too short'}
    ]
  }

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    private houseService: HousesService,
    private ticketQuestionService: TicketQuestionsService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private navController: NavController,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(12),
        // Validators.pattern('^[0-9]+$')
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
        // this.loadingMessage.dismiss()
      },
      () => {
        // console.log('Rejected')
        this.loadingMessage.dismiss()
      },
      () => {
        if (this.authService.userType == "AP"){
          this.fetchData()
        }
        else {
          let message = 'Not authorized'
          this.notifyService.openToastrError(message)
        }
      }
    )
  }

  fetchData() {
    let message = 'Welcome back!'
    this.houseService.getUser(this.authService.userID).subscribe()
    this.applicationService.getApplicant(this.authService.userID).subscribe(
      () => {},
      () => {
        this.loadingMessage.dismiss()
      },
      () => {
        this.notifyService.openToastr(message)
        this.loadingMessage.dismiss()
        this.navController.navigateBack(('/applicant/home'))
      }
    )
    this.ticketQuestionService.getUser(this.authService.userID).subscribe()
  }

}

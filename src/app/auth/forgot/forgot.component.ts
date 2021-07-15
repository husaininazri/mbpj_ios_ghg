import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  // Data
  email: string = ''

  // Form
  resetForm: FormGroup
  resetFormMessage = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'A valid email is required' }
    ]
  }

  // Loading 
  loadingMessage: HTMLIonLoadingElement

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    })
  }

  async reset() {
    this.loadingMessage = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await this.loadingMessage.present()

    this.authService.resetPassword(this.resetForm.value).subscribe(
      () => {
        // console.log('Reset success')
        this.loadingMessage.dismiss()
      },
      () => {
        // console.log('Reset unsuccessful')
        this.loadingMessage.dismiss()
      },
      () => {
        // console.log('After that')
        this.successMessage() 
      }
    )
  }
 
  successMessage() {
    let message = 'Reset password successful, a link is sent to your email'
    this.notifyService.openToastr(message)
  }

}

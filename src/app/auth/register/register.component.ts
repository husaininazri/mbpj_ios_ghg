import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  // Loading
  loadingMessage: HTMLIonLoadingElement

  // Form
  email: string = ''
  pwd: string = ''
  pwdConfirm: string = ''

  registerForm: FormGroup
  registerFormMessage = {
    'username': [
      { type: 'required', message: 'Your NRIC/passport is required' },
      { type: 'minlength', message: 'Passport must be 9 characters long' },
      { type: 'maxlength', message: 'NRIC cannot be more than 12 characters long' },
      // { type: 'pattern', message: 'Please enter NRIC without (-)' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password is too short'}
    ]
  }

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.minLength(9),
        Validators.maxLength(12),
        // Validators.pattern('^[0-9]+$')
      ])),
      password1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      password2: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
  }

  async register() {
    this.loadingMessage = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await this.loadingMessage.present();
    console.log(this.registerForm)
    if (this.registerForm.value.password1 != this.registerForm.value.password2){
      this.passwordError()
      this.loadingMessage.dismiss()
    }
    else {
      this.authService.register(this.registerForm.value).subscribe(
        () => {
          // console.log('Registration success')
          // this.successfulToast()
        },
        () => {
          // console.log('Registration unsuccessful')
          this.loadingMessage.dismiss()
        },
        () => {
          // console.log('After that')
          this.loadingMessage.dismiss()
          let message = 'Registration successful. You may now login'
          this.notifyService.openToastr(message)
        }
      )
    }
  }

  passwordError() {
    let message = 'Password and confirm password do not match'
    this.notifyService.openToastrError(message)
  }

}

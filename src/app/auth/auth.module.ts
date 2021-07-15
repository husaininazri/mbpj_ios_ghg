import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { LoginApplicantComponent } from './login-applicant/login-applicant.component';
import { LoginEvaluatorComponent } from './login-evaluator/login-evaluator.component';
import { ForgotComponent } from './forgot/forgot.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ForgotComponent,
    LoginComponent,
    LoginApplicantComponent,
    LoginEvaluatorComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule.forChild(AuthRoutes),
    TranslateModule.forChild()
  ]
})
export class AuthModule { }

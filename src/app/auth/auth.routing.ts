import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { LoginApplicantComponent } from './login-applicant/login-applicant.component';
import { LoginEvaluatorComponent } from './login-evaluator/login-evaluator.component';
import { ForgotComponent } from './forgot/forgot.component';

export const AuthRoutes: Routes = [
    {
        path: 'forgot',
        component: ForgotComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login-applicant',
        component: LoginApplicantComponent
    },
    {
        path: 'login-evaluator',
        component: LoginEvaluatorComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
]
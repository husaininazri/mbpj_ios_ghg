import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ApplicantLayoutComponent } from './layouts/applicant-layout/applicant-layout.component';
import { EvaluatorLayoutComponent } from './layouts/evaluator-layout/evaluator-layout.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ApplicantLayoutComponent,
    children: [
      {
        path: 'applicant',
        loadChildren: './core/applicant/applicant.module#ApplicantModule',
        canActivate: [AuthGuard],
        data: {
          role: 'AP'
        }
      }
    ]
  },
  {
    path: '',
    component: EvaluatorLayoutComponent,
    children: [
      {
        path: 'evaluator',
        loadChildren: './core/evaluator/evaluator.module#EvaluatorModule',
        canActivate: [AuthGuard],
        data: {
          role: 'EV'
        }
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

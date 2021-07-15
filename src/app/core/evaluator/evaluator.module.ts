import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatExpansionModule } from '@angular/material/expansion'; 

import { RouterModule } from '@angular/router';
import { EvaluatorRoutes } from './evaluator.routing';
import { ApplicationComponent } from './application/application.component';
import { ApplicationAssessmentComponent } from './application-assessment/application-assessment.component';
import { ApplicationEvaluationComponent } from './application-evaluation/application-evaluation.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HistoryComponent } from './history/history.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { TranslateModule } from '@ngx-translate/core';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    ApplicationAssessmentComponent,
    ApplicationDetailComponent,
    ApplicationEvaluationComponent,
    HomeComponent,
    HistoryComponent,
    NotificationComponent,
    ProfileComponent,
    ScheduleComponent,
    EvaluateComponent,
    HelpdeskComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FontAwesomeModule,
    MatExpansionModule,
    RouterModule.forChild(EvaluatorRoutes),
    TranslateModule.forChild()
  ]
})
export class EvaluatorModule { }

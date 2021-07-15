import { Routes } from '@angular/router';
import { ApplicationAssessmentComponent } from './application-assessment/application-assessment.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationEvaluationComponent } from './application-evaluation/application-evaluation.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HistoryComponent } from './history/history.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { TestComponent } from './test/test.component';

export const EvaluatorRoutes: Routes = [
    {
        path: 'application',
        component: ApplicationComponent
    },
    {
        path: 'application-assessment',
        component: ApplicationAssessmentComponent
    },
    {
        path: 'application-detail',
        component: ApplicationDetailComponent
    },
    {
        path: 'application-evaluation',
        component: ApplicationEvaluationComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path: 'notification',
        component: NotificationComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'schedule',
        component: ScheduleComponent
    },
    {
        path: 'evaluate',
        component: EvaluateComponent
    },
    {
        path: 'helpdesk',
        component: HelpdeskComponent
    },
    {
        path: 'test',
        component: TestComponent
    }
]
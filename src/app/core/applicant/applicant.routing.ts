import { Routes } from '@angular/router';

import { FaqComponent } from './faq/faq.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { HistoryComponent } from './history/history.component';
import { HistoryViewComponent } from './history-view/history-view.component';
import { HomeComponent } from './home/home.component';
import { HouseComponent } from './house/house.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { HouseAddNewComponent } from './house-add-new/house-add-new.component';
import { MapComponent } from './map/map.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplyComponent } from './apply/apply.component';
import { ApplyStartComponent } from './apply-start/apply-start.component';
import { ApplyFormComponent } from './apply-form/apply-form.component';

export const ApplicantRoutes: Routes = [
    {
        path:'',
        children: [
            {
                path: 'faq',
                component: FaqComponent
            },
            {
                path: 'guideline',
                component: GuidelineComponent
            },
            {
                path: 'helpdesk',
                component: HelpdeskComponent
            },
            {
                path: 'history',
                component: HistoryComponent
            },
            {
                path: 'history-view',
                component: HistoryViewComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'house',
                component: HouseComponent
            },
            {
                path: 'house-detail',
                component: HouseDetailComponent
            },
            {
                path: 'house-add-new',
                component: HouseAddNewComponent
            },
            {
                path: 'map-locate',
                component: MapComponent
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
                path: 'apply',
                component: ApplyComponent
            },
            {
                path: 'apply-start',
                component: ApplyStartComponent
            },
            {
                path: 'apply-form',
                component: ApplyFormComponent
            }
        ]
    }
]
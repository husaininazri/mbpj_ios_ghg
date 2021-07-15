import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatStepperModule } from '@angular/material/stepper'; 
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TranslateModule } from '@ngx-translate/core';

import { RouterModule } from '@angular/router';
import { ApplicantRoutes } from './applicant.routing';
import { FaqComponent } from './faq/faq.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { HistoryComponent } from './history/history.component';
import { HistoryViewComponent } from './history-view/history-view.component';
import { HomeComponent } from './home/home.component';
import { HouseAddNewComponent } from './house-add-new/house-add-new.component';
import { HouseComponent } from './house/house.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { MapComponent } from './map/map.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplyComponent } from './apply/apply.component';
import { ApplyStartComponent } from './apply-start/apply-start.component';
import { ApplyFormComponent } from './apply-form/apply-form.component';

@NgModule({
  declarations: [
    FaqComponent,
    GuidelineComponent,
    HelpdeskComponent,
    HistoryComponent,
    HistoryViewComponent,
    HomeComponent,
    HouseAddNewComponent,
    HouseComponent,
    HouseDetailComponent,
    MapComponent,
    NotificationComponent,
    ProfileComponent,
    
    ApplyComponent,
    ApplyStartComponent,
    ApplyFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule.forChild(ApplicantRoutes),
    MatExpansionModule,
    MatStepperModule,
    ReactiveFormsModule,
    LeafletModule,
    TranslateModule.forChild()
  ]
})
export class ApplicantModule { }

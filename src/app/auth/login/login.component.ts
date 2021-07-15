import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/shared/services/translate-config.service';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApplicationsService } from 'src/app/shared/services/applications/applications.service';
import { ApplicationAssessmentsService } from 'src/app/shared/services/application-assessments/application-assessments.service';
import { AssessmentAspectsService } from 'src/app/shared/services/assessment-aspects/assessment-aspects.service';
import { EvaluationsService } from 'src/app/shared/services/evaluations/evaluations.service';
import { EvaluationSchedulesService } from 'src/app/shared/services/evaluation-schedules/evaluation-schedules.service';
import { FaqsService } from 'src/app/shared/services/faqs/faqs.service';
import { HousesService } from 'src/app/shared/services/houses/houses.service';
import { OrganisationsService } from 'src/app/shared/services/organisations/organisations.service';
import { OrganisationTypesService } from 'src/app/shared/services/organisation-types/organisation-types.service';
import { MediasService } from 'src/app/shared/services/medias/medias.service';
import { RebatesService } from 'src/app/shared/services/rebates/rebates.service';
import { TicketAnswersService } from 'src/app/shared/services/ticket-answers/ticket-answers.service';
import { TicketQuestionsService } from 'src/app/shared/services/ticket-questions/ticket-questions.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  imgMBPJ = 'assets/img/logo/mbpj-logo.png'
  imgSmartPJ = 'assets/img/logo/smart-pj.png'
  imgHouse = 'assets/img/custom/green-house.png'
  selectedUserType: string = 'AP'

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    private applicationAssessmentService: ApplicationAssessmentsService,
    private assessmentAspectService: AssessmentAspectsService,
    private evaluationService: EvaluationsService,
    private evaluationScheduleService: EvaluationSchedulesService,
    private faqService: FaqsService,
    private houseService: HousesService,
    private mediaService: MediasService,
    private organisationService: OrganisationsService,
    private organisationTypeService: OrganisationTypesService,
    private rebateService: RebatesService,
    private ticketAnswerService: TicketAnswersService,
    private ticketQuestionService: TicketQuestionsService,
    private translateServices: TranslateConfigService,
    private router: Router
  ) { 
    this.initServices()
  }

  ngOnInit() {
    this.authService.userType = ''
    this.authService.tokenAccess = ''
    this.authService.tokenRefresh = ''
    this.authService.token = ''
    this.authService.userID = ''
  }

  initServices(){
    this.authService.getUsers().subscribe()
    this.applicationService.get().subscribe()
    this.applicationAssessmentService.get().subscribe()
    this.assessmentAspectService.get().subscribe()
    this.evaluationService.get().subscribe()
    this.evaluationScheduleService.get().subscribe()
    this.faqService.get().subscribe()
    this.houseService.get().subscribe()
    this.mediaService.get().subscribe()
    this.organisationService.get().subscribe()
    this.organisationTypeService.get().subscribe()
    this.rebateService.get().subscribe()
    this.ticketAnswerService.get().subscribe()
    this.ticketQuestionService.get().subscribe()
  }

  changeLanguageBM() {
    this.translateServices.setLanguage('my')
  }
  changeLanguageEN() {
    this.translateServices.setLanguage('en')
  }

  goToUserLogin() {
    // console.log('Login button clicked')
    // console.log(this.selectedUserType)
    if (this.selectedUserType == 'AP') {
      this.router.navigate(['/auth/login-applicant'])
    }
    else if (this.selectedUserType == 'EV') {
      this.router.navigate(['/auth/login-evaluator'])
    }
  }

}

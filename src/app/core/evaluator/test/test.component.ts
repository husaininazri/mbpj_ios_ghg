import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApplicationsService } from 'src/app/shared/services/applications/applications.service';
import { ApplicationAssessment } from 'src/app/shared/services/application-assessments/application-assessments.model';
import { ApplicationAssessmentsService } from 'src/app/shared/services/application-assessments/application-assessments.service';
import { AssessmentAspectsService } from 'src/app/shared/services/assessment-aspects/assessment-aspects.service';
import { EvaluationsService } from 'src/app/shared/services/evaluations/evaluations.service';
import { House } from 'src/app/shared/services/houses/houses.model';
import { HousesService } from 'src/app/shared/services/houses/houses.service';
import { User } from 'src/app/shared/services/auth/auth.model';

class MergedApplicationAssessment {
  public id: string
  public application: string
  public assessment_aspect: string
  public remarks: string
  public supporting_doc: string
  public aspect_name: string
  public aspect_type: string
  public aspect_id: string
  public aspect: string

  constructor(
    id: string,
    application: string,
    assessment_aspect: string,
    remarks: string,
    supporting_doc: string,
    aspect_name: string,
    aspect_type: string,
    aspect_id: string,
    aspect: string
  ){
    this. id = id
    this.application = application
    this.assessment_aspect = assessment_aspect
    this.remarks = remarks
    this.supporting_doc = supporting_doc
    this.aspect_name = aspect_name
    this.aspect_type = aspect_type
    this.aspect_id = aspect_id
    this.aspect = aspect
  }
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {

  isDoneSubmit: boolean = false
  isConfirm: boolean = false

  panelOpenState: boolean = false

  slidesOptions = {
    initialSlide: 0,
    speed: 400
  }

  public tempApplication
  public tempHouse: House
  public tempApplicant: User
  public tempApplicationAssessment: MergedApplicationAssessment[] = []

  public formGroup: FormGroup
  public form: FormArray

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
    private applicationAssessmentService: ApplicationAssessmentsService,
    private assessmentAspectService: AssessmentAspectsService,
    private evaluationService: EvaluationsService,
    private houseService: HousesService,

    public alertController: AlertController,
    public router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.tempApplication = this.router.getCurrentNavigation().extras
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      form: this.formBuilder.array([this.initEvaluationForm()])
    })
    this.houseService.houses.forEach(
      (data) => {
        if (data.id == this.tempApplication.applied_house){
          this.tempHouse = data
          console.log('house: ', this.tempHouse)
        }
      }
    )
    this.authService.users.forEach(
      (data) => {
        if (data.id == this.tempHouse.applicant){
          this.tempApplicant = data
          console.log('user: ', this.tempApplicant)
        }
      }
    )
    this.applicationAssessmentService.assessments.forEach(
      (data) => {
        if (data.application == this.tempApplication.id){
          this.assessmentAspectService.retrievedAssessmentAspects.forEach(
            (aspect, index) => {
              if (data.assessment_aspect == aspect.id) {
                this.tempApplicationAssessment.push({
                  id: data.id,
                  application: data.application,
                  assessment_aspect: data.assessment_aspect,
                  remarks: data.remarks,
                  supporting_doc: data.supporting_doc,
                  aspect_name: aspect.name,
                  aspect_type: aspect.aspect_type,
                  aspect_id: aspect.id,
                  aspect: aspect.aspect
                })
              }
              if (this.assessmentAspectService.retrievedAssessmentAspects.length === index+1) {
                this.tempApplicationAssessment.forEach(
                  (assessment) => {
                    this.form = this.formGroup.get('form') as FormArray
                    this.form.push(this.initEvaluationForm())
                  }
                )
              }
            }
          )
        }
      }
    )

  }

  initEvaluationForm() {
    return this.formBuilder.group({
      application_id: new FormControl(''),
      equipment: new FormControl(''),
      system: new FormControl(''),
      efficiency: new FormControl(''),
      remarks: new FormControl(''),
      evaluation_assessment_id: new FormControl('')
    })
  }

}

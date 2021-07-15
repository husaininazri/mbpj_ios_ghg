import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationAssessment } from './application-assessments.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationAssessmentsService {

  // URL
  private urlAssessment: string = environment.baseUrl + 'v1/application-assessments/'

  // Data
  public assessments: ApplicationAssessment[] = []
  public assessmentsFiltered: ApplicationAssessment[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: Form): Observable<any> {
    return this.http.post<any>(this.urlAssessment, body).pipe(
      tap((res) => {
        console.log('Create application assessment response: ', res)
      })
    )
  }

  get(): Observable<ApplicationAssessment[]> {
    return this.http.get<ApplicationAssessment[]>(this.urlAssessment).pipe(
      tap((res) => {
        this.assessments = res
        console.log('Application assessments: ', this.assessments)
      })
    )
  }

  filter(filterField): Observable<any> {
    let urlFilter = this.urlAssessment + '?' + filterField
    return this.http.get<ApplicationAssessment[]>(urlFilter).pipe(
      tap((res) => {
        this.assessmentsFiltered = res
        console.log('Filtered application assessments: ', this.assessmentsFiltered)
      })
    )
  }

}

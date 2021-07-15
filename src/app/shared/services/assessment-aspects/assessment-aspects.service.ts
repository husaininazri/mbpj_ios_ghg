import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssessmentAspect } from './assessment-aspects.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssessmentAspectsService {

  // URL
  private urlAspect: string = environment.baseUrl + 'v1/assessment-aspects/'

  // Data
  public retrievedAssessmentAspects: AssessmentAspect[] = []
  public retrievedFilteredAssessmentAspects: AssessmentAspect[] = []
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  create(body: Form): Observable<any> {
    return this.http.post<any>(this.urlAspect, body).pipe(
      tap((res) => {
        console.log('Create assessment aspect response: ', res)
      })
    )
  }

  get(): Observable<AssessmentAspect[]> {
    return this.http.get<AssessmentAspect[]>(this.urlAspect + '?ordering=name').pipe(
      tap((res) => {
        this.retrievedAssessmentAspects = res
        console.log('Assessment aspects: ', this.retrievedAssessmentAspects)
      })
    )
  }

  filter(filterField): Observable<any> {
    let urlFilter = this.urlAspect + '?' + filterField
    return this.http.get<AssessmentAspect[]>(urlFilter).pipe(
      tap((res) => {
        this.retrievedFilteredAssessmentAspects = res
        console.log('Filtered assessment aspects: ', this.retrievedFilteredAssessmentAspects)
      })
    )
  }

}

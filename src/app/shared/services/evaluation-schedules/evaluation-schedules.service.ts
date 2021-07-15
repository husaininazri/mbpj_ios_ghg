import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EvaluationSchedule } from './evaluation-schedules.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationSchedulesService {
  
  // URL
  private urlSchedule: string = environment.baseUrl + 'v1/evaluation-schedules/'

  // Data
  public schedules: EvaluationSchedule[] = []
  public schedulesFiltered: EvaluationSchedule[] = []
  
  constructor(
    private http: HttpClient
  ) { }

  create(body: Form): Observable<any> {
    return this.http.post<any>(this.urlSchedule, body).pipe(
      tap((res) => {
        console.log('Create evaluation schedule response: ', res)
      })
    )
  }

  get(): Observable<EvaluationSchedule[]> {
    return this.http.get<EvaluationSchedule[]>(this.urlSchedule).pipe(
      tap((res) => {
        this.schedules = res
        console.log('Evaluation schedules: ', this.schedules)
      })
    )
  }

  filter(filterField): Observable<any> {
    let urlFilter = this.urlSchedule + '?' + filterField + '/'
    return this.http.get<EvaluationSchedule[]>(urlFilter).pipe(
      tap((res) => {
        this.schedulesFiltered = res
        console.log('Filtered evaluation schedules: ', this.schedulesFiltered)
      })
    )
  }
  
}

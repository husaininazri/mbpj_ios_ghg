import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evaluation } from './evaluations.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {

  // URL
  private urlEvaluation: string = environment.baseUrl + 'v1/evaluations/'
  
  // Data
  public evaluations: Evaluation[] = []
  public evalutionsFiltered: Evaluation[] = []
  
  constructor(
    private http: HttpClient
  ) { }

  create(body): Observable<any> {
    return this.http.post<any>(this.urlEvaluation, body).pipe(
      tap((res) => {
        console.log('Create evaluation response: ', res)
      })
    )
  }

  get(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.urlEvaluation).pipe(
      tap((res) => {
        this.evaluations = res
        console.log('Evaluations: ', this.evaluations)
      })
    )
  }

  filter(filterField): Observable<any> {
    let urlFilter = this.urlEvaluation + '?' + filterField
    return this.http.get<Evaluation[]>(urlFilter).pipe(
      tap((res) => {
        this.evalutionsFiltered = res
        console.log('Filtered evaluations: ', this.evalutionsFiltered)
      })
    )
  }

}

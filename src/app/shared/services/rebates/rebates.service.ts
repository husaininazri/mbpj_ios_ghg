import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rebate } from './rebates.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RebatesService {

  // URL
  private urlRebate: string = environment.baseUrl + 'v1/rebates/'

  // Data
  public rebates: Rebate[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: Form): Observable<any>{
    return this.http.post<any>(this.urlRebate, body).pipe(
      tap((res) => {
        console.log('Create rebate: ', res)
      })
    )
  }

  get(): Observable<Rebate[]>{
    return this.http.get<Rebate[]>(this.urlRebate).pipe(
      tap((res) => {
        this.rebates = res
        console.log('Rebate types: ', this.rebates)
      })
    )
  }
  
}

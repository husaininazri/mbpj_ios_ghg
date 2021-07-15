import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Organisation } from './organisations.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsService {

  // URL
  public urlOrganisation: string = environment.baseUrl + 'v1/organisations/'

  // Data
  public organisations: Organisation[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: Form): Observable<any>{
    return this.http.post<any>(this.urlOrganisation, body).pipe(
      tap((res) => {
        console.log('Create organisation: ', res)
      })
    )
  }

  get(): Observable<Organisation[]>{
    return this.http.get<Organisation[]>(this.urlOrganisation).pipe(
      tap((res) => {
        this.organisations = res
        console.log('Organisations: ', this.organisations)
      })
    )
  }

}

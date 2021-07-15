import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrganisationType } from './organisation-types.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationTypesService {

  // URL
  private urlTypes: string = environment.baseUrl + 'v1/organisation-types/'

  // Data
  public types: OrganisationType[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: Form): Observable<any>{
    return this.http.post<any>(this.urlTypes, body).pipe(
      tap((res) => {
        console.log('Create organisation type: ', res)
      })
    )
  }

  get(): Observable<OrganisationType[]>{
    return this.http.get<OrganisationType[]>(this.urlTypes).pipe(
      tap((res) => {
        this.types = res
        console.log('Organisation types: ', this.types)
      })
    )
  }

}

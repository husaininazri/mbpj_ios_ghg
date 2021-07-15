import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faq } from './faqs.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  // URL
  private urlFaq: string = environment.baseUrl + 'v1/faqs/'

  // Data
  public faqs: Faq[]

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Faq[]>{
    return this.http.get<Faq[]>(this.urlFaq).pipe(
      tap((res: Faq[]) => {
        this.faqs = res
        console.log('Faqs: ', this.faqs)
      })
    )
  }

}

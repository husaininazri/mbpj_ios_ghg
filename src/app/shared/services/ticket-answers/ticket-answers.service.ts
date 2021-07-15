import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TicketAnswer } from './ticket-answers.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketAnswersService {

  // URL
  private urlAnswer: string = environment.baseUrl + 'v1/ticket-answers/'

  // Data
  public answers: TicketAnswer[] = []
  public answersFiltered: TicketAnswer[] = []
  public answersUser: TicketAnswer[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: Form): Observable<any> {
    return this.http.post<any>(this.urlAnswer, body).pipe(
      tap((res) => {
        console.log('Create ticket answer: ', res)
      })
    )
  }

  get(): Observable<TicketAnswer[]> {
    return this.http.get<TicketAnswer[]>(this.urlAnswer).pipe(
      tap((res) => {
        this.answers = res
        console.log('Ticket answers: ', this.answers)
      })
    )
  }

  filter(filterField): Observable<any> {
    let urlFilter = this.urlAnswer + '?' + filterField
    return this.http.get<TicketAnswer[]>(urlFilter).pipe(
      tap((res) => {
        this.answersFiltered = res
        console.log('Filtered ticket answers: ', this.answersFiltered)
      })
    )
  }

  getUser(id: string) {
    let urlFilter = this.urlAnswer + '?submitted_by=' + id
    return this.http.get<TicketAnswer[]>(urlFilter).pipe(
      tap((res) => {
        this.answersUser = res
        console.log('Filtered ticket answers: ', this.answersUser)
      })
    )
  }

}

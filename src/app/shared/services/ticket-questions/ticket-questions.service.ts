import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TicketQuestion } from './ticket-questions.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketQuestionsService {

  // URL
  private urlQuestion: string = environment.baseUrl + 'v1/ticket-questions/'

  // Data
  public questions: TicketQuestion[] = []
  public questionsFiltered: TicketQuestion[] = []
  public questionsUser: TicketQuestion[] = []

  constructor(
    private http: HttpClient
  ) { }

  create(body: Form): Observable<any> {
    return this.http.post<any>(this.urlQuestion, body).pipe(
      tap((res) => {
        console.log('Create ticket question: ', res)
      })
    )
  }

  get(): Observable<TicketQuestion[]> {
    return this.http.get<TicketQuestion[]>(this.urlQuestion).pipe(
      tap((res) => {
        this.questions = res
        console.log('Ticket questions: ', this.questions)
      })
    )
  }

  filter(filterField): Observable<any> {
    let urlFilter = this.urlQuestion + '?' + filterField
    return this.http.get<TicketQuestion[]>(urlFilter).pipe(
      tap((res) => {
        this.questionsFiltered = res
        console.log('Filtered ticket questions: ', this.questionsFiltered)
      })
    )
  }

  update(body: Form, id): Observable<any> {
    let updateUrl = this.urlQuestion + id  + '/'
    return this.http.put<any>(updateUrl, body).pipe(
      tap((res) => {
        //console.log('Updated user: ', res)
      })
    )
  }

  getUser(id: string) {
    let urlFilter = this.urlQuestion + '?submitted_by=' + id
    return this.http.get<TicketQuestion[]>(urlFilter).pipe(
      tap((res) => {
        this.questionsUser = res
        console.log('Filtered ticket questions: ', this.questionsUser)
      })
    )
  }

}

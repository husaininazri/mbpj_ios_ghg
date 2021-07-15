import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { User, UserOccupation, Registration, TokenResponse } from './auth.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL
  private urlUser: string = environment.baseUrl + 'v1/users/'
  private urlRegister: string = environment.baseUrl + 'auth/registration/'
  private urlReset: string = environment.baseUrl + 'auth/password/reset/'
  private urlTokenObtain: string = environment.baseUrl + 'auth/obtain/'
  private urlTokenRefresh: string = environment.baseUrl + 'auth/refresh/'
  private urlTokenVerify: string = environment.baseUrl + 'auth/verify/'

  // Data
  public users: User[] = []
  public occupations: UserOccupation[] = []
  
  public token: Object
  public tokenRefresh: string
  public tokenAccess: string

  public email: string
  public userID: string
  public username: string
  public userType: string
  public userSelfDetail: User

  public isLoginSuccessful: boolean = false
  
  constructor(
    private http: HttpClient
  ) { }

  register(body: Form): Observable<any>{
    return this.http.post<any>(this.urlRegister, body).pipe(
      tap((res) => {
        // console.log('Registration: ', res)
      })
    )
  }
  
  resetPassword(body: Form): Observable<any>{
    return this.http.post<any>(this.urlReset, body).pipe(
      tap((res) => {
        console.log('Reset password response: ', res)
      })
    )
  }

  obtainToken(body: Form): Observable<any>{
    let jwtHelper: JwtHelperService = new JwtHelperService()
    return this.http.post<any>(this.urlTokenObtain, body).pipe(
      tap((res) => {
        this.token = res
        this.tokenRefresh = res.refresh
        this.tokenAccess = res.access

        let decodedToken = jwtHelper.decodeToken(this.tokenAccess)
        this.email = decodedToken.email
        this.username = decodedToken.username
        this.userID = decodedToken.user_id
        this.userType = decodedToken.user_type
        // console.log('Decoded token: ', decodedToken)
        // console.log('Post response: ', res)
        // console.log('Token refresh', this.tokenRefresh)
        // console.log('Token access', this.tokenAccess)
        // console.log('Token: ', this.token)
        // console.log('Email: ', this.email)
        // console.log('Username: ', this.username)
        // console.log('User ID: ', this.userID)
        // console.log('User type: ', this.userType)
        this.isLoginSuccessful = true
        this.getUserDetail().subscribe()
      })
    )
  }

  refreshToken(body: Form): Observable<any> {
    return this.http.post<any>(this.urlTokenRefresh, body).pipe(
      tap((res) => {
        console.log('Token refresh: ', res)
        // this.token = res
      })
    )
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.urlUser).pipe(
      tap((res) => {
        this.users = res
        console.log('Users: ', this.users)
      })
    )
  }

  update(body: Form): Observable<any>{
    let urlUpdate = this.urlUser + this.userID + '/'
    return this.http.put<any>(urlUpdate, body).pipe(
      tap((res) => {
        console.log(res)
        this.getUserDetail().subscribe()
      })
    )
  }

  getUserDetail(): Observable<User>{
    return this.http.get<User>(this.urlUser + this.userID + '/').pipe(
      tap((res) => {
        console.log('Self detail: ', res)
        this.userSelfDetail = res
      })
    )
  }

}

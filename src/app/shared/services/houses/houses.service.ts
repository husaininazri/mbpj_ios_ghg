import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { House } from './houses.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  // URL
  private urlHouses: string = environment.baseUrl + 'v1/houses/'

  // Data
  public houses: House[] = []
  public housesApplicant: House[] = []
  public housesFiltered: House[] = []
  
  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<House[]>{
    return this.http.get<House[]>(this.urlHouses).pipe(
      tap((res: House[]) => {
        this.houses = res
        console.log('Houses: ', this.houses)
      })
    )
  }

  filter(filterField): Observable<any> {
    let urlFilter = this.urlHouses + '?' + filterField
    return this.http.get<House[]>(urlFilter).pipe(
      tap((res) => {
        this.housesFiltered = res
        console.log('Filtered houses: ', this.housesFiltered)
      })
    )
  }

  filterApplicant(id: string){
    this.houses.forEach(
      (data) => {
        console.log('masuk')
        if (data.applicant == id){
          this.housesApplicant.push(data)
          console.log(data)
        }
      }
    )
  }

  getUser(id: string){
    let urlFilter = this.urlHouses + '?applicant=' + id
    return this.http.get<House[]>(urlFilter).pipe(
      tap((res) => {
        this.housesFiltered = res
        console.log('Filtered houses: ', this.housesFiltered)
      })
    )
  }

  register(body: Form): Observable<any> {
    return this.http.post<any>(this.urlHouses,body).pipe(
      tap((res) => {
        console.log(res)
      })
    )
  }

  update(body: Form, currentHouseID: string): Observable<any> {
    let urlUpdate = this.urlHouses + currentHouseID + '/'
    return this.http.put<any>(urlUpdate, body).pipe(
      tap((res) => {
        console.log(res)
        this.get().subscribe()
      })
    )
  }

}

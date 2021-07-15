import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Media } from './medias.model';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediasService {
  
  // URL
  private urlMedia: string = environment.baseUrl + 'v1/medias/'

  // Data
  public medias: Media[]

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Media[]>{
    return this.http.get<Media[]>(this.urlMedia).pipe(
      tap((res: Media[]) => {
        this.medias = res
        console.log('Medias: ', this.medias)
      })
    )
  }

}

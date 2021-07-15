import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Notification } from "./notifications.model";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  // URL
  private url: string = environment.baseUrl + "v1/notifications/";

  // Data
  public notifications: Notification[] = [];
  public notificationsFiltered: Notification[] = [];

  constructor(private http: HttpClient) {}

  get(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.url).pipe(
      tap((res: Notification[]) => {
        this.notifications = res;
        console.log("notifications: ", this.notifications);
      })
    );
  }

  getUser(id: string): Observable<Notification[]> {
    let urlFilter = this.url + "?to_user=" + id;
    return this.http.get<Notification[]>(urlFilter).pipe(
      tap((res) => {
        this.notificationsFiltered = res;
        console.log("Filtered notifications: ", this.notificationsFiltered);
      })
    );
  }

  register(body): Observable<any> {
    return this.http.post<any>(this.url, body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }

  update(body, currentNotificationID: string): Observable<any> {
    let urlUpdate = this.url + currentNotificationID + "/";
    return this.http.put<any>(urlUpdate, body).pipe(
      tap((res) => {
        console.log(res);
        this.get().subscribe();
      })
    );
  }
}

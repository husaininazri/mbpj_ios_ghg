import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Application } from "./applications.model";
import { Form } from "@angular/forms";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, tap, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class ApplicationsService {
  // URL
  private urlApplication: string = environment.baseUrl + "v1/applications/";

  // Data
  public applications: Application[] = [];
  public applicationsFiltered: Application[] = [];

  // Applicant
  public applicationsApplicant: Application[] = [];
  public applicationsApplicantCurrent: Application[] = [];
  public applicationsApplicantPast: Application[] = [];

  // Evaluator
  public applicationsEvaluatorNominated: Application[] = [];
  public applicationsEvaluatorNominatedCurrent: Application[] = [];
  public applicationsEvaluatorNominatedPast: Application[] = [];

  // public deleteItems: Application[] = []

  constructor(private http: HttpClient) {}

  get(): Observable<Application[]> {
    return this.http.get<Application[]>(this.urlApplication).pipe(
      tap((res) => {
        this.applications = res;
        console.log("Applications: ", this.applications);
      })
    );
  }

  filter(filterField): Observable<any> {
    let filterUrl = this.urlApplication + "?" + filterField;
    return this.http.get<Application[]>(filterUrl).pipe(
      tap((res) => {
        this.applicationsFiltered = res;
        console.log("Filtered applications: ", this.applicationsFiltered);
      })
    );
  }

  extended(filterField): Observable<any> {
    let extendedUrl = "";
    if (filterField)
      extendedUrl = this.urlApplication + "extended/?" + filterField;
    else extendedUrl = this.urlApplication + "extended";
    return this.http.get<Application[]>(extendedUrl).pipe(
      tap((res) => {
        // console.log("Filtered applications: ", this.applicationsFiltered);
      })
    );
  }

  assign(body, appID): Observable<any> {
    let urlAssign = this.urlApplication + appID + "/";
    return this.http.put<any>(urlAssign, body).pipe(
      tap((res) => {
        console.log("Create application response: ", res);
      })
    );
  }

  // Applicant
  create(body: Form): Observable<any> {
    return this.http.post<any>(this.urlApplication, body).pipe(
      tap((res) => {
        console.log("Create application: ", res);
      })
    );
  }

  getApplicant(id: string): Observable<any> {
    //let filterUrl = this.urlApplication + '?applicant=' + this.authService.userID
    let urlFilter = this.urlApplication + "?applicant=" + id;
    return this.http.get<Application[]>(urlFilter).pipe(
      tap((res) => {
        this.applicationsApplicant = res;
        console.log("Applicant applications: ", this.applicationsApplicant);
        this.filterApplicant();
      })
    );
  }

  filterApplicant() {
    this.applicationsApplicant.forEach((application) => {
      if (
        application.status === "CM" ||
        application.status === "RJ" ||
        application.status === "PD"
      ) {
        this.applicationsApplicantPast.push(application);
      } else {
        this.applicationsApplicantCurrent.push(application);
      }
    });
  }

  // Evaluator
  getEvaluator(id: string): Observable<any> {
    // let filterUrl = this.urlApplication + '?evaluator_nominated=' + this.authService.userID + '&status=IE'
    let urlFilter =
      this.urlApplication + "?evaluator_nominated=" + id + "&status=IE";
    return this.http.get<Application[]>(urlFilter).pipe(
      tap((res) => {
        this.applicationsEvaluatorNominated = res;
        console.log(
          "Nominated applications: ",
          this.applicationsEvaluatorNominated
        );
        this.filterEvaluator();
      })
    );
  }

  filterEvaluator() {
    this.applicationsEvaluatorNominated.forEach((application) => {
      if (
        application.status === "CM" ||
        application.status === "RJ" ||
        application.status === "PD"
      ) {
        this.applicationsEvaluatorNominatedPast.push(application);
      } else {
        this.applicationsEvaluatorNominatedCurrent.push(application);
      }
    });
  }

  getApplicantDetail(): Observable<any> {
    return this.http
      .get<any>(this.urlApplication + "get_application_details/")
      .pipe(
        tap((res) => {
          console.log("Applications: ", this.applications);
        })
      );
  }

  get_filter_one_application_per_year(body): Observable<any> {
    return this.http
      .post<any>(
        this.urlApplication + "get_filter_one_application_per_year/",
        body
      )
      .pipe(
        tap((res) => {
          console.log("Application: ", res);
        })
      );
  }
}

import { Component, OnInit } from '@angular/core';
import * as MenuItem from '../../shared/menu/menu-items';

@Component({
  selector: 'app-applicant-layout',
  templateUrl: './applicant-layout.component.html',
  styleUrls: ['./applicant-layout.component.scss'],
})
export class ApplicantLayoutComponent implements OnInit {

  public appPages = MenuItem.Applicant
  public imgLogo = 'assets/img/logo/mbpj-emblem.png'

  constructor() { }

  ngOnInit() {}

}

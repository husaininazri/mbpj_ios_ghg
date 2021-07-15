import { Component, OnInit } from '@angular/core';
import * as MenuItem from '../../shared/menu/menu-items';

@Component({
  selector: 'app-evaluator-layout',
  templateUrl: './evaluator-layout.component.html',
  styleUrls: ['./evaluator-layout.component.scss'],
})
export class EvaluatorLayoutComponent implements OnInit {

  public appPages = MenuItem.Evaluator
  public imgLogo = 'assets/img/logo/mbpj-emblem.png'

  constructor() { }

  ngOnInit() {}

}

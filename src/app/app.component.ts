import { Component, Input } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './shared/services/auth/auth.service';
import * as MenuItem from './shared/menu/menu-items';
import { TranslateConfigService } from './shared/services/translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = MenuItem.Applicant

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private translateServices: TranslateConfigService,
  ) {
    this.initializeApp();
    this.translateServices.getDefaultLanguage();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.statusBar.styleBlackOpaque();
      //this.statusBar.styleLightContent();
      //this.statusBar.backgroundColorByHexString('#fff');
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByName("white");
      this.splashScreen.hide();
    });

  }

}

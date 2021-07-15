import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { ApplicantLayoutComponent } from './layouts/applicant-layout/applicant-layout.component';
import { EvaluatorLayoutComponent } from './layouts/evaluator-layout/evaluator-layout.component';
import { AppRoutingModule } from './app-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faFileMedical } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas,far,fab);

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64/ngx';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './shared/services/translate-config.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { JwtService } from './shared/handler/jwt/jwt.service';
import { HttpTokenInterceptor } from './shared/interceptor/http.token.interceptor';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ApplicantLayoutComponent,
    EvaluatorLayoutComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    LeafletModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FilePath,
    WebView,
    Base64,
    Geolocation,
    OneSignal,
    JwtService,
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
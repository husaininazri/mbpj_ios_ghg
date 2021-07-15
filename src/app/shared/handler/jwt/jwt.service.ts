import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class JwtService {

  constructor(
    private storage: NativeStorage,
    private authService: AuthService // debuging purposes
  ) {}

  getToken(title: string) {
    // return this.storage.getItem(title)
    return window.localStorage[title];
  }

  saveToken(title: string, token: string) {
    window.localStorage[title] = token;
    // this.storage.setItem(title, token)
  }

  destroyToken() {
    // this.storage.clear()
    window.localStorage.clear()
  }

  getTokenDebug() { // debuging purposes
    return this.authService.tokenAccess
  }

  /*

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  */

}
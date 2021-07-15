import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    public toastr: ToastController
  ) { }

  async openToastrConnection() {
    let message = 'No connection'
    const toast = await this.toastr.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'warning'
    });
    toast.present();
  }

  async openToastrError(statusText: string) {
    let message = statusText
    const toast = await this.toastr.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  async openToastr(statusText: string) {
    let message = statusText
    const toast = await this.toastr.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: 'primary'
    });
    toast.present();
  }

}

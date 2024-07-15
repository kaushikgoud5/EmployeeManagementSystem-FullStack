import { EventEmitter, Injectable } from '@angular/core';
import { ToasterComponent } from '../components/common/toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})

export class ToasterService {
  showToast:EventEmitter<Toast>=new EventEmitter();
  onShowToast(message: string, type: 'success' | 'error' | 'info') {
   this.showToast.emit({
    message: message,
    type: type
   });
    
  }
  constructor() { }
}
interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}
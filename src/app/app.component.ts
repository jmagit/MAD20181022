import { Component } from '@angular/core';
import { NotificationService } from './common-app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hola mundo';
  constructor(notify: NotificationService) {
    notify.add('Demo');
    notify.remove(0);
    notify.remove(0);
  }
}

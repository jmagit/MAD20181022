import { Component } from '@angular/core';
import { AuthService } from './seguridad/servicios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(auth: AuthService) {
    if (!auth.isAutenticated) {
      auth.login(true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU0MDM5NTc3NH0.aa30kqDjeRzIwV5tPVvR5gMGltFebzAbIpGe693MFnI', 'admin');
    }
  }
}

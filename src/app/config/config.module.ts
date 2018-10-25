import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { DatosComponent } from './datos/datos.component';
import { ChangePaswordComponent } from './change-pasword/change-pasword.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ConfigComponent, pathMatch: 'full' },
  { path: 'datos', component: DatosComponent },
  { path: 'password', component: ChangePaswordComponent }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ],
  declarations: [ConfigComponent, DatosComponent, ChangePaswordComponent]
})
export class ConfigModule { }

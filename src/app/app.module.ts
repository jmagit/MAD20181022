import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndraCoreModule } from 'src/indra-core';
import { ClientesModule } from './clientes/clientes.module';
import { CommonAppModule } from './common-app/common-app.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule,
    IndraCoreModule, ClientesModule, CommonAppModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

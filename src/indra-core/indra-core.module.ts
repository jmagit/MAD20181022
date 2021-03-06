import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { IndraSizerComponent } from './components/indra-sizer.component';
import { PIPES_NUMERICOS } from './pipes/numericos.pipe';
import { MIS_VALIDADORES } from './directives/validaciones.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PIPES_CADENAS, PIPES_NUMERICOS, IndraSizerComponent,
    MIS_VALIDADORES, ],
  exports: [PIPES_CADENAS, PIPES_NUMERICOS, IndraSizerComponent,
    MIS_VALIDADORES, ],
})
export class IndraCoreModule {
  constructor( @Optional() @SkipSelf() parentModule: IndraCoreModule) {
    if (parentModule) {
      const msg = `IndraCoreModule has already been loaded.
        Import IndraCoreModule once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}

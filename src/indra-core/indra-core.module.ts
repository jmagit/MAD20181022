import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { IndraSizerComponent } from './components/indra-sizer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PIPES_CADENAS, IndraSizerComponent, ],
  exports: [PIPES_CADENAS, IndraSizerComponent, ],
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

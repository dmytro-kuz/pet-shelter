import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonDefaultComponent } from './button-default/button-default.component';
import { ButtonDonateComponent } from './button-donate/button-donate.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [ButtonDefaultComponent, ButtonDonateComponent],
  exports: [ButtonDefaultComponent, ButtonDonateComponent, MatButtonModule],
})
export class ButtonsModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckGroupDirective } from './directives/check-group.directive';
import { CheckGroupItemDirective } from './directives/check-group-item.directive';
import { CheckGroupTogglerDirective } from './directives/check-group-toggler.directive';

@NgModule({
  declarations: [AppComponent, CheckGroupDirective, CheckGroupItemDirective, CheckGroupTogglerDirective],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

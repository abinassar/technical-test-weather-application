import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivePipe } from './active.pipe';



@NgModule({
  declarations: [
    ActivePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ActivePipe
  ]
})
export class ActivePipeModule { }

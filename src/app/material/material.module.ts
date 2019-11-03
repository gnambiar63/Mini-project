import { NgModule } from '@angular/core';
import { MatButtonModule, MatStepperModule } from '@angular/material';

const MaterialComponent = [
  MatButtonModule,
  MatStepperModule
]

@NgModule({
  imports: [
    MaterialComponent
  ],
  exports : [
    MaterialComponent
  ]
})
export class MaterialModule { }

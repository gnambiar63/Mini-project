import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './home/input/input.component';
import { PaperComponent } from './home/paper/paper.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CourseOutcomeComponent } from './home/input/course-outcome/course-outcome.component';
import { COPOMappingComponent } from './home/input/co-po-mapping/co-po-mapping.component';
import { MarksDistributionComponent } from './home/input/marks-distribution/marks-distribution.component';
import { AttainmentComponent } from './home/input/attainment/attainment.component';
import { CourseExitComponent } from './home/input/course-exit/course-exit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ConfirmEqualValidatorDirective,
    HomeComponent,
    InputComponent,
    PaperComponent,
    CourseOutcomeComponent,
    COPOMappingComponent,
    MarksDistributionComponent,
    AttainmentComponent,
    CourseExitComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

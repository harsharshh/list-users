import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {authRoutes} from './auth-route';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ThemeModule
  ]
})
export class AuthModule { }

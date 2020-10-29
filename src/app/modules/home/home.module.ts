import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HOME_ROUTES} from './home.route';
import {AvatarComponent} from './column-templates/avatar.component';
import {DeleteComponent} from './column-templates/delete.component';
import {UpdateComponent} from './column-templates/update.component';
import { AddUserComponent } from './sub-component/add-user/add-user.component';
import { SingleUserComponent } from './sub-component/single-user/single-user.component';


@NgModule({
  declarations: [
    HomeComponent,
    AvatarComponent,
    DeleteComponent,
    UpdateComponent,
    AddUserComponent,
    SingleUserComponent
  ],
  imports: [
    RouterModule.forChild(HOME_ROUTES),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ThemeModule
  ],
  entryComponents: [
    AvatarComponent,
    DeleteComponent,
    UpdateComponent,
    AddUserComponent,
    SingleUserComponent
  ]
})
export class HomeModule {
}

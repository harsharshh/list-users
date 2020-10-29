import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppPageComponent} from './@theme/layouts/app-page/app-page.component';
import {AuthGuard} from './modules/auth/guard/auth-guard';
import {authRoutes} from './modules/auth/auth-route';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppPageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        children: [...authRoutes]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

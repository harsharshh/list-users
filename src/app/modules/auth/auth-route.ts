import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {AuthService} from './service/auth.service';


@Injectable({providedIn: 'root'})
export class AuthResolver implements Resolve<any> {
  constructor(private authService: AuthService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }
}

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    resolve: {
      authResolver:  AuthResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class NgxAuthRoutingModule {
}

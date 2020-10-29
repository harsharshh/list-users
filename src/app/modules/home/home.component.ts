import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from './service/home.service';
import {NbDialogService} from '@nebular/theme';
import {Subscription} from 'rxjs/Rx';
import {AuthService} from '../auth/service/auth.service';
import {AvatarComponent} from './column-templates/avatar.component';
import {UpdateComponent} from './column-templates/update.component';
import {DeleteComponent} from './column-templates/delete.component';
import {AddUserComponent} from './sub-component/add-user/add-user.component';
import {SingleUserComponent} from './sub-component/single-user/single-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private homeService: HomeService,
              private nbDialogService: NbDialogService,
              private authService: AuthService) {
  }

  users: any;
  metaData: any;
  currentPage =1;
  subscription: Subscription;
  settings = {
    actions: false,
    selectMode: '',
    hideSubHeader: true,
    pager: false,
    editable: false,
    columns: {
      avatar: {
        title: 'Avatar',
        type: 'custom',
        renderComponent: AvatarComponent
      },
      id: {
        title: '#ID',
        type: 'string',
        valuePrepareFunction: (data) => {
          if (!!data) {
            return data;
          } else {
            return '-';
          }
        }
      },
      first_name: {
        title: 'First Name',
        type: 'string',
        valuePrepareFunction: (data) => {
          if (!!data) {
            return data;
          } else {
            return '-';
          }
        }
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
        valuePrepareFunction: (data) => {
          if (!!data) {
            return data;
          } else {
            return '-';
          }
        }
      },
      email: {
        title: 'Last Name',
        type: 'string',
        valuePrepareFunction: (data) => {
          if (!!data) {
            return data;
          } else {
            return '-';
          }
        }
      },
      update: {
        title: 'update &  Single User View',
        type: 'custom',
        filter: false,
        sort: false,
        addable: false,
        editable: false,
        position: 'right',
        show: false,
        renderComponent: UpdateComponent,
        styles: 'display:none'
      },

      delete: {
        title: 'Delete',
        type: 'custom',
        filter: false,
        sort: false,
        addable: false,
        editable: false,
        position: 'right',
        show: false,
        renderComponent: DeleteComponent,
        styles: 'display:none'
      }
    },
  };




  ngOnInit(): void {
    this.getUsers();

  }

  ngAfterViewInit() {
    this.subscription = this.homeService.isActionDoneResponse.subscribe(res => {
      if (res == true) {
        this.getUsers();
      }
    })
  }


  getUsers(options?) {
    if(options) {
      this.currentPage = options;
    }
    this.homeService.getUsers(this.currentPage).subscribe(res => {
      this.users = res.data;
      this.metaData = res;
    })
  }


  createUser() {
    const modalRef = this.nbDialogService.open(AddUserComponent);
    modalRef.componentRef.instance.data = null;
  }

  singleUserNotFound() {
    const modalRef =  this.nbDialogService.open(SingleUserComponent);
    modalRef.componentRef.instance.id = 23;
  }

  logout() {
    this.authService.logOutLocal();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}

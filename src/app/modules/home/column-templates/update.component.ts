import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {AddUserComponent} from '../sub-component/add-user/add-user.component';
import {SingleUserComponent} from '../sub-component/single-user/single-user.component';

@Component({
  template: `
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-self-center">
        <button nbButton shape="round" status="primary" class="mx-1" nbTooltip="Update" (click)="update()">
          <nb-icon icon="edit-outline"></nb-icon>
        </button>
        <button nbButton shape="round" status="info" class="mx-1" nbTooltip="Single user View"  (click)="view()">
          <nb-icon icon="eye-outline"></nb-icon>
        </button>

      </div>
    </div>`,
})

export class UpdateComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  constructor(private nbDialogService: NbDialogService) {

  }
  ngOnInit() {
  }

  update() {
  const modalRef =  this.nbDialogService.open(AddUserComponent);
  modalRef.componentRef.instance.data = this.rowData;
  }

  view() {
    const modalRef =  this.nbDialogService.open(SingleUserComponent);
    modalRef.componentRef.instance.id = this.rowData.id;

  }
}

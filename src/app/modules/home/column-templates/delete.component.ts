import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {HomeService} from '../service/home.service';
import {AlertService} from '../service/alert.service';

@Component({
  template: `
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-self-center">
        <button nbButton shape="round" status="danger" (click)="delete(rowData?.id)">
          <nb-icon icon="trash-outline"></nb-icon>
        </button>
      </div>
    </div>`,
})

export class DeleteComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  constructor(private homeService: HomeService,
              private alerService: AlertService) {}
  ngOnInit() {
  }

  delete(id) {
    this.homeService.deleteUser(id).subscribe(res=> {
      this.alerService.showSuccessAlert('User Deleted');
      this.homeService.setActionDone(true);
    });
  }
}

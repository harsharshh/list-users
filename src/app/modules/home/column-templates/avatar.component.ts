import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  template: `
    <div class="d-flex justify-content-start align-items-center">
      <div class="align-self-center">
        <nb-user size="large"
                 onlyPicture
                 [name]="rowData?.first_name"
                 [picture]="value">
        </nb-user>
      </div>
    </div>`,
})

export class AvatarComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
  }
}

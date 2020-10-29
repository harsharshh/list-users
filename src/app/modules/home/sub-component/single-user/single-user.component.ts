import {Component, Input, OnInit} from '@angular/core';
import {HomeService} from '../../service/home.service';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  constructor(private homeService: HomeService,
              private nbDialogRef: NbDialogRef<SingleUserComponent>,) {
  }

  ngOnInit(): void {
    if (this.id) {
      this.homeService.getSingleUser(this.id).subscribe(res => {
        this.data = res.data;
      })
    }
  }

  @Input() id: any;
  data: any;

  close() {
    this.nbDialogRef.close();
  }

}

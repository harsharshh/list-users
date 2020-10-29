import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {HomeService} from '../../service/home.service';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() data: any;
  @Input() users: any;
  userForm: FormGroup;
  userId: any;
  model: any;


  constructor(private nbDialogRef: NbDialogRef<AddUserComponent>,
              private fb: FormBuilder,
              private homeService: HomeService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      pincode: ['', Validators.required],

    });
    if (this.data) {
      this.userId = this.data.id;
      this.model = this.data;
      this.userForm.get('first_name').setValue(this.model.first_name);
      this.userForm.get('last_name').setValue(this.model.last_name);
      this.userForm.get('phone').setValue(this.model.phone);
      this.userForm.get('address').setValue(this.model.address);
      this.userForm.get('email').setValue(this.model.email);
      this.userForm.get('pincode').setValue(this.model.pincode);

    }
  }

  close() {
    this.nbDialogRef.close();
  }

  submit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      this.model = this.userForm.value;
      if (!this.userId) {
        this.homeService.addUser(this.model).subscribe(res => {
          if (res) {
            this.homeService.setActionDone(true);
            this.close();
            this.alertService.showSuccessAlert('user has been created');
          }

        }, () => {
          this.alertService.showErrorAlert('Error Occured');
        })
      } else {
        this.homeService.updateUser(this.model, this.userId).subscribe(res => {
          if (res) {
            this.homeService.setActionDone(true);
            this.close();
            this.alertService.showSuccessAlert('User has been updated');
          }
        }, () => {
          this.alertService.showErrorAlert('error');
        })
      }
    }
  }

  get f() {
    return this.userForm.controls;
  }
}

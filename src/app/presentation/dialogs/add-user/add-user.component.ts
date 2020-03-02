import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { parse } from 'querystring';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

    userForm: FormGroup;
    roleOptions = [{ name: 'Admin', value: 0 }, { name: 'SuperAdmin', value: 1 }, { name: 'Manager', value: 2 }, { name: 'USer', value: 3 }];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        public dialog: MatDialog, public datepipe: DatePipe, private http: HttpClient, private dialogRef: MatDialogRef<AddUserComponent>
    ) {
        this.initMessageToSingle();

    }

    ngOnInit(): void {
    }
    initMessageToSingle() {

        this.userForm = this.formBuilder.group({
            username: new FormControl({ value: "", disabled: false }),
            firstName: new FormControl({ value: "", disabled: false }),
            password: new FormControl({ value: "", disabled: false }),
            lastName: new FormControl({ value: "", disabled: false }),
            address: new FormControl({ value: "", disabled: false }),
            role: new FormControl({ value: null, disabled: false }),
            dateOfBirth: new FormControl({ value: this.datepipe.transform("", 'yyyy-MM-dd'), disabled: false }),
            salary: new FormControl({ value: 0, disabled: false }),
        });
        this.userForm.get('role').setValue(this.roleOptions[0]);
    }

    hasError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }

    onSubmit(row) {
        const sndForm = {
            firstName: this.userForm.value.username,
            password: this.userForm.value.password,
            lastName: this.userForm.value.lastName,
            address: this.userForm.value.address,
            role: this.userForm.value.role.value,
            dateOfBirth: this.userForm.value.dateOfBirth,
            salary: this.userForm.value.salary,
            username: this.userForm.value.username

        };
        this.http.post("https://localhost:44343/user/AddUser", sndForm).subscribe(x => {
            this.dialogRef.close();
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Page } from 'src/app/core/models/page.model';
import { HttpClient } from '@angular/common/http';
import { UserDetailsComponent } from '../../dialogs/user-details/user-details.component';
import { AddUserComponent } from '../../dialogs/add-user/add-user.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  rows: any;
  constructor( private toastr: ToastrService,private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {

    this.getData();
  }
  public getData() {
    this.http.get("https://localhost:44343/user/").subscribe(x => {
      this.rows = x;
    },
      error => {
      });
  }
  updateUser(row) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '80%',
      height: '80%',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }
  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }
  removeUser(row) {
    this.http.delete("https://localhost:44343/user/" + row.id).subscribe(x => {
      this.toastr.success("removed user");
      this.getData();
    },
      error => {
      });

  }
}



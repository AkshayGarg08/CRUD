import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Crud-app';

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor( private _dailog:MatDialog , private _api:EmployeeService){}

  ngOnInit(): void {
      this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dailog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }


  getEmployeeList() {
    this._api.getEmployee().subscribe((data:any) => {
      console.log("Employee List:", data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      console.log(data)

    })
  }
  openEditForm(data: any) {
    const dialogRef = this._dailog.open(EmpAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }


  deleteEmployee(id: string) {
    console.log("Deleting employee with ID:", id);
    this._api.deleteEmployee(id).subscribe({
      next: (res) => {
        console.log("API called successfully");
        this.getEmployeeList();
      },
      error: (err) => {
        console.error("Delete error:", err);
      },
    });
  }
  
  


}

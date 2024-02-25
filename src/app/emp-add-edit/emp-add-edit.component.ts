import { DialogRef } from '@angular/cdk/dialog';
import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit  {

  empForm: FormGroup;

  education: String[] = [
    'Metric',
    'Intermediate',
    'Graduation',
    'Post Graduate'
  ]
  constructor(
    private _fb: FormBuilder, 
    private _empservice: EmployeeService , 
    private _dialgref: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    )
     {
    this.empForm = this._fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      expereince: '',
      package: '',
    })

  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }


  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empservice.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val:any)=>{
            alert('Data upadted successfully');
            this._dialgref.close(true);

          },
          error:(err:any)=>{
            console.log(err)
          }
        })
  
      }else{
        this._empservice.addEmployee(this.empForm.value).subscribe((data) => {
          console.log(data)
          alert("Data saved successflly");
          this._dialgref.close(true);
        }, (err: any) => {
          console.log(err);
        })
  
      }
     
    }
  }
  
}

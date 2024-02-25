import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }
  // Add data
  addEmployee(data:any){
    return this._http.post('http://localhost:3000/employee',data);
  }
  // get data
  getEmployee(){
    return this._http.get('http://localhost:3000/employee');
  }
  //delete data
  deleteEmployee(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/employee/${id}`);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employee/${id}`, data);
  }


}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';
import { Employee } from './employee';

declare var M: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form?: NgForm) {
    console.log(form.value);
    if (form.value._id) {
      this.userService.putEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getEmployees();
          M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.userService.postEmployee(form.value)
      .subscribe(res => {
        this.getEmployees();
        this.resetForm(form);
        M.toast({html: 'Save successfully'});
      });
    }

  }

  getEmployees() {
    this.userService.getEmployees()
      .subscribe(res => {
        this.userService.employees = res as Employee[];
      });
  }

  editEmployee(employee: Employee) {
    this.userService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete it?')) {
      this.userService.deleteEmployee(_id)
        .subscribe(res => {
          this.getEmployees();
          this.resetForm(form);
          M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  resetForm(form?: NgForm) {
  if (form) {
    form.reset();
    this.userService.selectedEmployee = new Employee;
  }
  }

}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../autth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSignup(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}

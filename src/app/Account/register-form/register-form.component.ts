import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppUser } from 'src/app/Models/AppUser';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() fullPage: boolean = false;
  
  constructor(private fb: FormBuilder, private accountService: AccountService, 
    private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.validate();
  }

  activeIndex: number = 0;
  signupForm: FormGroup;

  appUser: AppUser;

  name = new FormControl('',
  {
    validators: [
      Validators.required
    ],
    updateOn: 'blur'
  });

  email = new FormControl('',
  { 
    validators: [
      Validators.required,
      Validators.email
    ], 
    updateOn: 'blur'
  });

  password = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$')
    ],
     updateOn: 'blur'
  });

  validate() {
    this.signupForm = this.fb.group({
      email: this.email,
      password: this.password,
      name: this.name
    }
  )};

  signUp() {
    this.appUser = {
      email: this.email.value,
      password: this.password.value,
      name: this.name.value
    };
    if(this.signupForm.valid) {
      this.accountService.signUp(this.appUser).subscribe();
      if (this.accountService.loggedIn === true && this.fullPage === true) {
        this.router.navigateByUrl('/');
      }
    } else if (this.signupForm.get("password").hasError("pattern")) {
      this.messageService.add({severity:'warn', summary:'Invalid password!', 
      detail: 'Your password should contains at least 6 characters with at least one uppercase, one digital and one special character!'});
    }
  }

}

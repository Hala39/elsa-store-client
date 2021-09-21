import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppUser } from 'src/app/Models/AppUser';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  
  constructor(private fb: FormBuilder, private accountService: AccountService, 
    private messageService: MessageService, private router: Router) { }

  @Input() fullPage: boolean = false;
  goBack: boolean = false;

  ngOnInit(): void {
    this.validate();
  }

  value: string;
  activeIndex: number = 1;

  loginForm: FormGroup;
  appUser: AppUser;
  hide = true;

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
      Validators.required
    ],
     updateOn: 'blur'
  });


  validate() {
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    }
  )};

  login() {
    this.appUser = {
      email: this.email.value,
      password: this.password.value
    }
    if(this.loginForm.valid) {
      if (this.fullPage) {
        this.goBack = true;
      } 
      this.accountService.logIn(this.appUser, this.goBack).subscribe();
    } else {
      this.messageService.add({severity:'error', summary:'Attention!', detail: 'Invalid data!'});
    }
  }

  switch() {
    this.hide = !this.hide;
  }

}

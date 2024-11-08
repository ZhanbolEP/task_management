import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub?: Subscription;
  submitted = false;  // Added this property

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('You can LogIn')
        // Now you can log in using your credentials
      } else if (params['accessDenied']) {
        MaterialService.toast('Log in first')
        // Please log in first
      }else if(params['sessionFailed']) {
        MaterialService.toast('Log in to system again')
      }
    });
  }

  ngOnDestroy(): void {
    this.aSub?.unsubscribe();
  }

  onSubmit(): void {
    this.submitted = true;  // Set submitted to true when form is submitted
    this.form.disable();

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message)
        //console.warn('Login error:', error);
        this.form.enable();
        this.submitted = false;  // Reset submitted to false if there's an error
      }
    );
  }
}

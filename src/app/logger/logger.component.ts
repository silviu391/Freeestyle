import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs";

import { AlertService } from "../services/alert.service";
import { AuthenticationService } from "../services/authServices";

@Component({ templateUrl: `logger.component.html` })
export class LoggerComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string = "";

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    public ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    get username(){
        return this.loginForm.get('username');
    }
    get password(){
        return this.loginForm.get('password');
    }
    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.get('username')!.value, this.loginForm.get('password')!.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error =>{
                    this.alertService.error(error);
                    this.loading=false;
                }
            )
    }
}
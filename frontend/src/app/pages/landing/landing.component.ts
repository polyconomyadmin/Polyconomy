// import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
// import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// declare const google: any; // Google Identity SDK

// @Component({
//   selector: 'app-landing',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './landing.component.html',
//   styleUrls: ['./landing.component.css']
// })
// export class LandingComponent implements AfterViewInit {

//   // ---------------- STATE ----------------
//   mode: 'login' | 'signup' = 'login';
//   step: 'plan' | 'auth' = 'auth'; // show login first
//   error = '';
//   form = { name: '', username: '', email: '', password: '' };
//   selectedPlan: 'student' | 'professional' | 'enterprise' | null = null;

//   get selectedPlanLabel(): string {
//     switch (this.selectedPlan) {
//       case 'student': return 'Student / Researcher';
//       case 'professional': return 'Professional';
//       case 'enterprise': return 'Institution / Enterprise';
//       default: return '';
//     }
//   }

//   constructor(
//     private auth: AuthService,
//     private router: Router,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {}

//   // ---------------- LOGIN / SIGNUP ----------------
//   submit() {
//     this.error = '';

//     // Academic email verification for student signup
//     if (this.mode === 'signup' && this.selectedPlan === 'student') {
//       if (!this.isAcademicEmail(this.form.email)) {
//         this.error = 'Please use a valid academic email (e.g., .edu, .ac domains).';
//         return;
//       }
//     }

//     // Attach plan for signup
//     const payload = this.mode === 'signup' 
//       ? { ...this.form, plan: this.selectedPlan }
//       : this.form;

//     const action = this.mode === 'login' 
//       ? this.auth.login(payload)
//       : this.auth.signup(payload);

//     action.subscribe({
//       next: (res) => {
//         this.auth.setSession(res);
//         this.router.navigate(['/chat']);
//       },
//       error: (err) => {
//         this.error = err.error?.message || 'Something went wrong';
//       }
//     });
//   }

//   isAcademicEmail(email: string): boolean {
//     if (!email) return false;
//     const academicRegex = /@([a-zA-Z0-9.-]+)\.(edu|ac(\.[a-z]{2})?)$/i;
//     return academicRegex.test(email);
//   }

//   // ---------------- FLOW ----------------
//   goToSignup() {
//     this.mode = 'signup';
//     this.step = 'plan'; // first select plan for signup
//   }

//   selectPlan(plan: 'student' | 'professional' | 'enterprise') {
//     this.selectedPlan = plan;
//     this.step = 'auth'; // show signup form after plan selected
//   }

//   // ---------------- GOOGLE LOGIN ----------------
//   private GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
//   private REDIRECT_URI = 'http://localhost:4200/oauth2callback';

//   ngAfterViewInit() {
//     if (!isPlatformBrowser(this.platformId)) return;

//     this.loadGoogleScript()
//       .then(() => {
//         if (!google?.accounts?.id) return;
//         google.accounts.id.initialize({
//           client_id: this.GOOGLE_CLIENT_ID,
//           callback: (response: any) => this.handleGoogleCredential(response)
//         });
//       })
//       .catch(err => console.error('Google script failed to load', err));
//   }

//   private loadGoogleScript(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       if (!isPlatformBrowser(this.platformId)) { resolve(); return; }
//       if (document.getElementById('google-client-script')) { resolve(); return; }

//       const script = document.createElement('script');
//       script.src = 'https://accounts.google.com/gsi/client';
//       script.id = 'google-client-script';
//       script.async = true;
//       script.defer = true;
//       script.onload = () => resolve();
//       script.onerror = () => reject('Failed to load Google script');
//       document.body.appendChild(script);
//     });
//   }

//   signInWithGoogle() {
//     if (!isPlatformBrowser(this.platformId)) return;
//     if (!google?.accounts?.id) { this.error = 'Google Sign-In not loaded'; return; }

//     try {
//       google.accounts.id.prompt((notification: any) => {
//         if (notification.isNotDisplayed() || notification.isSkippedMoment() || notification.isDismissedMoment()) {
//           this.openGooglePopup();
//         }
//       });
//     } catch {
//       this.openGooglePopup();
//     }
//   }

//   private openGooglePopup() {
//     if (!isPlatformBrowser(this.platformId)) return;

//     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.GOOGLE_CLIENT_ID}` +
//                 `&response_type=token&scope=email%20profile&redirect_uri=${encodeURIComponent(this.REDIRECT_URI)}`;
//     window.open(url, 'google-login', 'width=500,height=600');
//   }

//   private handleGoogleCredential(response: any) {
//     const token = response.credential;
//     if (!token) { this.error = 'Google login failed'; return; }

//     this.auth.googleLogin(token).subscribe({
//       next: (res) => { this.auth.setSession(res); this.router.navigate(['/chat']); },
//       error: (err) => { this.error = err.error?.message || 'Google login failed'; }
//     });
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LogIn, UserPlus, Mail, Lock, User, ArrowLeft, GraduationCap, Briefcase, Building2, KeyRound, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  icons = { LogIn, UserPlus, Mail, Lock, User, ArrowLeft, GraduationCap, Briefcase, Building2, KeyRound, CheckCircle };

  // ---------------- FLOW STATE ----------------
  mode: 'login' | 'signup' = 'login';
  step: 'auth' | 'plan' | 'forgot' | 'reset' = 'auth';

  selectedPlan: 'student' | 'professional' | 'enterprise' | null = null;

  // ---------------- FORM ----------------
  form = {
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    identifier: '' // username OR email for login
  };

  error = '';
  passwordStrength: 'very-weak' | 'weak' | 'so-so' | 'good' | 'great' | null = null;
  passwordStrengthLabel = '';
  passwordMismatch = false;

  forgotStep: 'form' | 'sent' = 'form';
  forgotEmail = '';
  resetToken = '';
  resetForm = { password: '', confirmPassword: '' };

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // ---------------- LABEL ----------------
  get selectedPlanLabel(): string {
    return {
      student: 'Student / Researcher',
      professional: 'Professional',
      enterprise: 'Institution / Enterprise'
    }[this.selectedPlan!] || '';
  }

  // ---------------- FLOW ----------------
  goToSignup() {
    this.mode = 'signup';
    this.step = 'plan';
    this.error = '';
  }

  selectPlan(plan: 'student' | 'professional' | 'enterprise') {
    this.selectedPlan = plan;
    this.step = 'auth';
  }

  // ---------------- SUBMIT ----------------
  submit() {
    this.error = '';
    if (this.mode === 'login') {
      this.login();
    } else {
      this.signup();
    }
  }

  goToGuestMode() {
    this.router.navigateByUrl(' ');
  }

  // ---------------- LOGIN ----------------
  private login() {
    
    if (!this.form.identifier || !this.form.password) {
      this.error = 'Please enter username/email and password';
      return;
    }

    this.auth.login({
      identifier: this.form.identifier,
      password: this.form.password
    }).subscribe({
      next: res => {
        this.auth.setSession(res);
        this.router.navigate(['/chat']);
      },
      error: err => {
        this.error = err.error?.message || 'Invalid credentials';
      }
    });
  }

  // ---------------- SIGNUP ----------------
  private signup() {
    if (!this.form.email || !this.form.password) {
      this.error = 'Email and password are required';
      return;
    }

    if (this.selectedPlan === 'student' && !this.isAcademicEmail(this.form.email)) {
      this.error = 'Please use a valid academic email (.edu, .ac)';
      return;
    }

    // if (this.passwordStrength === 'weak') {
    //   this.error = 'Please choose a stronger password';
    //   return;
    // }

    if (this.form.password !== this.form.confirmPassword) {
  this.error = 'Passwords do not match';
  return;
}

if (this.passwordStrength === 'very-weak' || this.passwordStrength === 'weak') {
  this.error = 'Please choose a stronger password';
  return;
}


    

    this.auth.signup({
      name: this.form.name,
      email: this.form.email,
      username: this.form.username,
      password: this.form.password,
      plan: this.selectedPlan
    }).subscribe({
      next: res => {
        this.auth.setSession(res);
        this.router.navigate(['/chat']);
      },
      error: err => {
        const msg = err.error?.message || '';
        if (msg.includes('email')) {
          this.error = 'An account already exists with this email';
        } else if (msg.includes('username')) {
          this.error = 'This username is already taken';
        } else {
          this.error = 'Signup failed';
        }
      }
    });
  }

  // ---------------- PASSWORD STRENGTH ----------------
  checkPasswordStrength(password: string) {
  let score = 0;

  if (!password) {
    this.passwordStrength = null;
    return;
  }

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      this.passwordStrength = 'very-weak';
      this.passwordStrengthLabel = 'Very weak password';
      break;
    case 2:
      this.passwordStrength = 'weak';
      this.passwordStrengthLabel = 'Weak password';
      break;
    case 3:
      this.passwordStrength = 'so-so';
      this.passwordStrengthLabel = 'So-so password';
      break;
    case 4:
      this.passwordStrength = 'good';
      this.passwordStrengthLabel = 'Good password';
      break;
    default:
      this.passwordStrength = 'great';
      this.passwordStrengthLabel = 'Great password';
  }

  this.checkPasswordMatch();
}

checkPasswordMatch() {
  this.passwordMismatch =
    !!this.form.confirmPassword &&
    this.form.password !== this.form.confirmPassword;
}



  // ---------------- ACADEMIC EMAIL ----------------
  private isAcademicEmail(email: string): boolean {
    return /@.+\.(edu|ac(\.[a-z]{2})?)$/i.test(email);
  }

  uid: string = '';

 ngOnInit(): void {
  const uid = this.route.snapshot.queryParamMap.get('uid');
  const token = this.route.snapshot.queryParamMap.get('token');

  if (uid && token) {
    this.uid = uid;
    this.resetToken = token;
    this.step = 'reset';
  }
}



goToForgotPassword(): void {
  this.step = 'forgot';       // new step name
  this.forgotStep = 'form';
  this.error = '';
}

submitForgotPassword(): void {
  if (!this.forgotEmail) { this.error = 'Please enter your email.'; return; }
  this.error = '';

  this.auth.forgotPassword(this.forgotEmail).subscribe({
    next: () => { this.forgotStep = 'sent'; },
    error: (err) => { this.error = err.error?.error || 'Something went wrong.'; }
  });
}

submitResetPassword(): void {
  if (this.resetForm.password !== this.resetForm.confirmPassword) {
    this.error = 'Passwords do not match.';
    return;
  }

  if (this.resetForm.password.length < 8) {
    this.error = 'Password must be at least 8 characters.';
    return;
  }

  if (!this.uid || !this.resetToken) {
    this.error = 'Invalid or expired reset link.';
    return;
  }

  this.error = '';

  this.auth.resetPassword(this.uid, this.resetToken, this.resetForm.password).subscribe({
    next: () => {
      this.step = 'auth';
      this.mode = 'login';
      this.error = '';
      // Optional: show success message
    },
    error: (err) => {
      this.error = err.error?.error || 'Reset link is invalid or expired.';
    }
  });
}


// submitResetPassword(): void {
//   if (this.resetForm.password !== this.resetForm.confirmPassword) {
//     this.error = 'Passwords do not match.'; return;
//   }
//   if (this.resetForm.password.length < 8) {
//     this.error = 'Password must be at least 8 characters.'; return;
//   }
//   this.error = '';

//   this.auth.resetPassword(this.resetToken, this.resetForm.password).subscribe({
//     next: () => {
//       this.step = 'auth';
//       this.mode = 'login';
//       // Optionally show a success banner here
//     },
//     error: (err) => { this.error = err.error?.error || 'Something went wrong.'; }
//   });
// }
}



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Check } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
}

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent {
  icons = { ArrowLeft, Check };

  user: any = {};

  readonly plans: Plan[] = [
    { id: 'free', name: 'Free', price: '£0', features: ['5 guest questions', 'Basic economics topics', 'Chat history'] },
    { id: 'pro', name: 'Professional', price: '£9.99/mo', features: ['Unlimited questions', 'Advanced topics', 'Translation', 'Priority support'] },
    { id: 'institute', name: 'Institute', price: 'Custom', features: ['Everything in Pro', 'Multi-user access', 'Custom training data', 'Dedicated support'] },
  ];

  constructor(public auth: AuthService, private router: Router) {
    this.user = this.auth.getUser() || {};
  }

  get currentPlan(): string {
    return this.user?.plan || 'free';
  }

  get accountType(): string {
    return this.user?.user_type || this.user?.plan || 'student';
  }

  choosePlan(plan: Plan) {
    // No billing integration yet — route enquiries through Contact.
    this.router.navigate(['/contact']);
  }
}

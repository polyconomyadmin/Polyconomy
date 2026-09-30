import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Check, MessageCircleQuestion } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

interface Plan {
  id: 'free' | 'pro' | 'institute';
  name: string;
  price: string;
  features: string[];
  cta: string;
}

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent {
  icons = { ArrowLeft, Check, MessageCircleQuestion };

  // Upgrade requests go to the same inbox as the Contact form (CONTACT_EMAIL on the backend).
  private readonly UPGRADE_EMAIL = 'polyconomy.admin@gmail.com';

  readonly plans: Plan[] = [
    { id: 'free', name: 'Free', price: '£0', cta: 'Upgrade', features: ['5 guest questions', 'Basic economics topics', 'Chat history'] },
    { id: 'pro', name: 'Professional', price: '£9.99/mo', cta: 'Upgrade', features: ['Unlimited questions', 'Advanced topics', 'Translation', 'Priority support'] },
    { id: 'institute', name: 'Institute', price: 'Custom', cta: 'Contact Sales', features: ['Everything in Pro', 'Multi-user access', 'Custom training data', 'Dedicated support'] },
  ];

  // There's no billing yet, so every account is on Free. (user.plan is the account type
  // chosen at sign-up, e.g. "student", not a paid tier.)
  readonly currentPlan: Plan['id'] = 'free';

  private user: any;

  constructor(auth: AuthService) {
    this.user = auth.getUser() || {};
  }

  /** Opens a pre-filled email: there's no checkout, so upgrades are handled by the team. */
  planMailto(plan: Plan): string {
    const subject = plan.id === 'institute' ? 'Institute plan enquiry' : `Upgrade to ${plan.name}`;
    const body =
      `Hi Polyconomy team,\n\n` +
      (plan.id === 'institute'
        ? `I'd like to find out more about the Institute plan.\n\n`
        : `I'd like to upgrade to the ${plan.name} plan (${plan.price}).\n\n`) +
      `Name: ${this.user.name || ''}\n` +
      `Username: ${this.user.username || ''}\n` +
      `Email: ${this.user.email || ''}\n`;
    return `mailto:${this.UPGRADE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

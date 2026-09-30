import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Send, CheckCircle } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  icons = { ArrowLeft, Send, CheckCircle };

  form = { name: '', email: '', subject: '', message: '' };
  sent = false;
  sending = false;
  error = '';

  constructor(private auth: AuthService, private cdr: ChangeDetectorRef) {}

  // "/" is the guest chat, so signed-in users must go back to /chat instead.
  get homeLink(): string {
    return this.auth.isAuthenticated() ? '/chat' : '/';
  }

  submit() {
    const { name, email, subject, message } = this.form;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      this.error = 'Please fill in all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    this.error = '';
    this.sending = true;
    // Sent server-side via Twilio SendGrid SMTP (see contact_message in users/views.py).
    this.auth.sendContactMessage(this.form).subscribe({
      next: () => {
        this.sending = false;
        this.sent = true;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.sending = false;
        this.error = err.error?.error || 'Sorry, your message could not be sent. Please try again.';
        this.cdr.markForCheck();
      },
    });
  }
}

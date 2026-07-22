import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Send, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  icons = { ArrowLeft, Send, CheckCircle };

  // Where contact submissions are sent. Update to the real inbox as needed.
  private readonly ADMIN_EMAIL = 'polyconomy.admin@gmail.com';

  form = { name: '', email: '', subject: '', message: '' };
  sent = false;

  submit() {
    // No dedicated backend endpoint yet, so hand off to the user's mail client.
    const body = `Name: ${this.form.name}\nEmail: ${this.form.email}\n\n${this.form.message}`;
    const href =
      `mailto:${this.ADMIN_EMAIL}` +
      `?subject=${encodeURIComponent(this.form.subject)}` +
      `&body=${encodeURIComponent(body)}`;
    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
    this.sent = true;
  }
}

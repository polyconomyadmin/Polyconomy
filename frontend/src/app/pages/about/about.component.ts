import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  icons = { ArrowLeft };

  constructor(private auth: AuthService) {}

  // "/" is the guest chat, so signed-in users must go back to /chat instead.
  get homeLink(): string {
    return this.auth.isAuthenticated() ? '/chat' : '/';
  }
}

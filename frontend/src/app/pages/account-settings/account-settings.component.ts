import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LucideAngularModule, ArrowLeft, Camera } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent {
  icons = { ArrowLeft, Camera };

  // Profile pictures are resized in the browser to this square size before upload.
  private readonly AVATAR_SIZE = 256;
  private readonly MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

  user: any = {};
  nameInput = '';

  savingName = false;
  savingAvatar = false;
  profileError = '';
  profileSaved = '';

  passwordForm = { current: '', next: '', confirm: '' };
  savingPassword = false;
  passwordError = '';
  passwordSaved = false;

  constructor(public auth: AuthService, private cdr: ChangeDetectorRef) {
    this.user = this.auth.getUser() || {};
    this.nameInput = this.user.name || '';
  }

  get initials(): string {
    const name = (this.user?.name || this.user?.username || 'User').trim();
    const parts = name.split(/\s+/);
    return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() || 'U';
  }

  /** The account type chosen at sign-up (student / professional / enterprise). */
  get accountType(): string {
    return this.user?.plan || '—';
  }

  get nameChanged(): boolean {
    const trimmed = this.nameInput.trim();
    return !!trimmed && trimmed !== (this.user.name || '');
  }

  // ─── Profile ──────────────────────────────────────────────────────────────

  saveName() {
    if (!this.nameChanged || this.savingName) return;
    this.savingName = true;
    this.save({ name: this.nameInput.trim() }, 'Name updated', () => (this.savingName = false));
  }

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = ''; // allow picking the same file again later
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.setProfileError('Please choose an image file.');
      return;
    }
    if (file.size > this.MAX_UPLOAD_BYTES) {
      this.setProfileError('That image is too large (max 10 MB).');
      return;
    }

    this.savingAvatar = true;
    this.profileError = '';
    this.resizeToSquare(file)
      .then(dataUrl => this.save({ avatar: dataUrl }, 'Profile picture updated', () => (this.savingAvatar = false)))
      .catch(() => {
        this.savingAvatar = false;
        this.setProfileError("We couldn't read that image. Try a JPEG or PNG.");
      });
  }

  removeAvatar() {
    if (this.savingAvatar) return;
    this.savingAvatar = true;
    this.save({ avatar: null }, 'Profile picture removed', () => (this.savingAvatar = false));
  }

  private save(changes: { name?: string; avatar?: string | null }, successMsg: string, done: () => void) {
    this.profileError = '';
    this.profileSaved = '';
    this.auth.updateProfile(changes).subscribe({
      next: () => {
        done();
        this.user = this.auth.getUser();
        this.nameInput = this.user.name || '';
        this.profileSaved = successMsg;
        this.cdr.markForCheck();
      },
      error: (err: HttpErrorResponse) => {
        done();
        this.setProfileError(err.error?.error || "Couldn't save your changes. Please try again.");
      },
    });
  }

  private setProfileError(msg: string) {
    this.profileError = msg;
    this.profileSaved = '';
    this.cdr.markForCheck();
  }

  /** Centre-crops the image to a square and scales it down, returning a JPEG data URL. */
  private resizeToSquare(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        const size = Math.min(this.AVATAR_SIZE, side);
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx || !side) return reject();
        ctx.fillStyle = '#fff'; // transparent PNGs would otherwise turn black as JPEG
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(
          img,
          (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side,
          0, 0, size, size
        );
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject();
      };
      img.src = url;
    });
  }

  // ─── Password ─────────────────────────────────────────────────────────────

  changePassword() {
    const { current, next, confirm } = this.passwordForm;
    this.passwordSaved = false;
    if (!current || !next || !confirm) {
      this.passwordError = 'Please fill in all three fields.';
      return;
    }
    if (next.length < 8) {
      this.passwordError = 'New password must be at least 8 characters.';
      return;
    }
    if (next !== confirm) {
      this.passwordError = "New passwords don't match.";
      return;
    }

    this.passwordError = '';
    this.savingPassword = true;
    this.auth.changePassword(current, next).subscribe({
      next: () => {
        this.savingPassword = false;
        this.passwordSaved = true;
        this.passwordForm = { current: '', next: '', confirm: '' };
        this.cdr.markForCheck();
      },
      error: (err: HttpErrorResponse) => {
        this.savingPassword = false;
        this.passwordError = err.error?.error || "Couldn't change your password. Please try again.";
        this.cdr.markForCheck();
      },
    });
  }
}

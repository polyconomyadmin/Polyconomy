import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ChatComponent } from './pages/chat/chat.component';
import { authGuard } from './services/auth.guard';
import { GuestChatComponent } from './guest-chat/guest-chat.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';

export const routes: Routes = [
    // { path: '', component: GuestChatComponent }, 
    // { path: 'login', component: LandingComponent }, 
    // { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
    // { path: '**', redirectTo: '' },
    { path: '', component: GuestChatComponent },

    { path: 'login', component: LandingComponent },
    { path: 'signup', component: LandingComponent },
    { path: 'select-plan', component: LandingComponent },
    { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
    {path: 'reset-password', component: LandingComponent},
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'settings', component: AccountSettingsComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' },
    
]
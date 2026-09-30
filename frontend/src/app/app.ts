import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, NavigationEnd, Router  } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LucideAngularModule, ServerCrash, DatabaseZap, BotOff } from 'lucide-angular';
import { HealthService } from './services/health.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  protected readonly icons = { ServerCrash, DatabaseZap, BotOff };

  // Popup copy for each kind of outage (see Outage in health.service.ts).
  protected readonly outageCopy = {
    server: {
      icon: ServerCrash,
      title: 'Server Unavailable',
      message: "We can't connect to the Polyconomy server right now. It's down for maintenance, so please try again shortly.",
    },
    database: {
      icon: DatabaseZap,
      title: 'Database Unavailable',
      message: "We can't reach our database right now, so sign-in and saved chats won't work. It's down for maintenance, so please try again shortly.",
    },
    rag: {
      icon: BotOff,
      title: 'Polyconomy AI Unavailable',
      message: "Our AI service isn't responding right now, so we can't answer questions. It's down for maintenance, so please try again shortly.",
    },
  };

  // Maintenance popup state lives in HealthService so RagService can raise it too.
  protected health = inject(HealthService);
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  showFooter = true; // default visible

  ngOnInit() {
    // Prerendered HTML must not bake in a result, so only check in the browser.
    if (!this.isBrowser) return;

    this.health.check();

    // Re-check on entering the chat (e.g. straight after signing in).
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        if (e.urlAfterRedirects.startsWith('/chat')) this.health.check();
      });
  }

  // Method to hide the footer
  setFooterVisibility(show: boolean) {
    this.showFooter = show;
    // const footer = document.querySelector('footer') as HTMLElement;
    // if (footer) {
    //   footer.style.visibility = show ? 'visible' : 'hidden';
    // }
  }
}

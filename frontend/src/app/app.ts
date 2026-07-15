import { Component, signal } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router  } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  showFooter = true; // default visible

  // Method to hide the footer
  setFooterVisibility(show: boolean) {
    this.showFooter = show;
    // const footer = document.querySelector('footer') as HTMLElement;
    // if (footer) {
    //   footer.style.visibility = show ? 'visible' : 'hidden';
    // }
  }
}



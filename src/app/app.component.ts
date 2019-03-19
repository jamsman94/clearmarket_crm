import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})

export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router
  ) {
    renderer.setAttribute(
      el.nativeElement,
      'CRM-version',
      '1.0.0'
    );
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {

      });
  }
}

import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResizeObserverService {
  private resizeSubject = new BehaviorSubject<number>(this.getWindowInnerWidth());
  resize$ = this.resizeSubject.asObservable();

  constructor(private ngZone: NgZone) {
    this.observeResize();
  }

  private getWindowInnerWidth(): number {
    return typeof window !== 'undefined' ? window.innerWidth : 0;
  }

  private observeResize() {
    if (typeof window !== 'undefined') {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          this.ngZone.run(() => {
            this.resizeSubject.next(entry.contentRect.width);
          });
        }
      });

      resizeObserver.observe(document.body);
    }
  }
}

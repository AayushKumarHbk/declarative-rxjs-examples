import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, combineLatest, fromEvent, fromEventPattern, map, merge, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-basic-user-events',
  templateUrl: './basic-user-events.component.html',
  styleUrls: ['./basic-user-events.component.scss']
})
export class BasicUserEventsComponent implements AfterViewInit {

  public mouseEvents$!: Observable<string>;

  ngAfterViewInit() {
    this.initMouseEvents();
  }

  private initMouseEvents(): void {
    this.mouseEvents$ = merge(
      fromEvent(document, 'mousedown', { capture: true }).pipe(
        map(() => "Mouse Down Clicked")
      ),
      fromEvent(document, 'mouseup', { capture: true }).pipe(
        map(() => "Mouse Up Clicked")
      ),
      fromEvent(document, 'mousemove', { capture: true }).pipe(
        map(() => "Mouse Moved")
      )
    ).pipe(
      startWith("No user event"),
      tap(x => console.log("x", x))
    );
  }

}

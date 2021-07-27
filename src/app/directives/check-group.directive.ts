import { Directive, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CheckableItem,
  CheckGroupService,
} from '../services/check-group.service';

@Directive({
  selector: '[appCheckGroup]',
  providers: [CheckGroupService],
})
export class CheckGroupDirective {
  @Output() public groupCheckEvent: EventEmitter<CheckableItem[]> = new EventEmitter();

  private destroy$: Subject<void> = new Subject();

  constructor(private readonly checkGroup: CheckGroupService) {}

  public ngOnInit(): void {
    this.checkGroup.checkGroupState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.groupCheckEvent.emit([...this.checkGroup.groupItems]);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

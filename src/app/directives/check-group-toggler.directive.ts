import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CheckGroupService } from '../services/check-group.service';

@Directive({
  selector: '[appCheckGroupToggler]',
})
export class CheckGroupTogglerDirective implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  constructor(
    private readonly checkGroup: CheckGroupService,
    private readonly matCheckbox: MatCheckbox
  ) {}

  public ngOnInit(): void {
    this.checkGroup.checkGroupState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const checkedItemsCount = this.checkGroup.checkedItemsCount;
        const totalItemsCount = this.checkGroup.groupItems.size;

        this.matCheckbox.checked =
          this.checkGroup.checkedItemsCount === this.checkGroup.groupItems.size;
        this.matCheckbox.indeterminate =
          checkedItemsCount > 0 && totalItemsCount > checkedItemsCount;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('change', ['$event.checked'])
  public toggleAllItems(isChecked: boolean): void {
    this.checkGroup.toggleAllItems(isChecked);
    this.matCheckbox.checked = isChecked;
  }
}

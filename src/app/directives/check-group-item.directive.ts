import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CheckableItem,
  CheckGroupService,
} from '../services/check-group.service';

@Directive({
  selector: '[appCheckGroupItem]',
})
export class CheckGroupItemDirective implements OnInit, OnChanges, OnDestroy {
  @Input() public checkableItem: CheckableItem;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private readonly checkGroup: CheckGroupService,
    private readonly matCheckbox: MatCheckbox
  ) {}

  public ngOnInit(): void {
    this.checkGroup.checkGroupState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.matCheckbox.checked = this.checkableItem.checked;
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.checkableItem) {
      this.checkGroup.removeItem(changes.checkableItem.previousValue);
      if (changes.checkableItem.currentValue) {
        this.checkGroup.addItem(this.checkableItem);
        this.matCheckbox.checked = this.checkableItem.checked;
      }
    }
  }

  public ngOnDestroy(): void {
    this.checkGroup.removeItem(this.checkableItem);
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('change', ['$event.checked'])
  public onToggle(isChecked: boolean): void {
    this.checkableItem.checked = isChecked;
    this.checkGroup.updateCheckedItemsCountAndEmitState();
  }
}

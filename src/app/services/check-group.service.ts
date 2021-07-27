import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface CheckableItem {
  checked?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CheckGroupService {

  public groupItems: Set<CheckableItem> = new Set();
  public checkedItemsCount: number = 0;
  public checkGroupState$: Subject<void> = new Subject();

  constructor() {}

  public addItem(item: CheckableItem): void {
    this.groupItems.add(item);
    this.updateCheckedItemsCountAndEmitState();
  }

  public removeItem(item: CheckableItem): void {
    this.groupItems.delete(item);
    this.updateCheckedItemsCountAndEmitState();
  }

  public toggleAllItems(isChecked: boolean): void {
    this.groupItems.forEach((item: CheckableItem) => item.checked = isChecked);
    this.updateCheckedItemsCountAndEmitState();
  }

  public updateCheckedItemsCountAndEmitState(): void {
    this.checkedItemsCount = 0;
    this.groupItems.forEach((item: CheckableItem) => {
      if (item.checked) {
        this.checkedItemsCount++;
      }
    });
    this.checkGroupState$.next();
  }
}

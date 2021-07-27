import { Directive, HostListener, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { CheckGroupService } from '../services/check-group.service';

@Directive({
  selector: '[appCheckGroupToggler]'
})
export class CheckGroupTogglerDirective implements OnInit {

  constructor(
    private readonly checkGroup: CheckGroupService,
    private readonly matCheckbox: MatCheckbox,
  ) { }

  public ngOnInit(): void {
    this.checkGroup.checkGroupState$.subscribe(() => {
      const checkedItemsCount = this.checkGroup.checkedItemsCount;
      const totalItemsCount = this.checkGroup.groupItems.size;

      this.matCheckbox.checked = this.checkGroup.checkedItemsCount === this.checkGroup.groupItems.size;
      this.matCheckbox.indeterminate = checkedItemsCount > 0 && totalItemsCount > checkedItemsCount;
      
    });
  }

  @HostListener('change', ['$event.checked'])
  public toggleAllItems(isChecked: boolean): void {
    this.checkGroup.toggleAllItems(isChecked);
    this.matCheckbox.checked = isChecked;
  }
}

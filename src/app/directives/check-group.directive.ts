import { Directive, Output, EventEmitter } from '@angular/core';
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

  constructor(private readonly checkGroup: CheckGroupService) {}

  public ngOnInit(): void {
    this.checkGroup.checkGroupState$.subscribe(() => {
      this.groupCheckEvent.emit([...this.checkGroup.groupItems]);
    });
  }
}

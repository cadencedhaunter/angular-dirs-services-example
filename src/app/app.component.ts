import { Component } from '@angular/core';
import { CheckableItem } from './services/check-group.service';

interface Item extends CheckableItem {
  id: number;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public items: Item[] = [
    {
      id: 0,
      title: 'first task',
      checked: true,
    },
    {
      id: 1,
      title: 'second task',
    },
    
    {
      id: 2,
      title: 'third task',
    }
  ];

  public anotherItems: Item[] = [
    {
      id: 10,
      title: 'A',
    },
    {
      id: 11,
      title: 'B',
    },    
    {
      id: 12,
      title: 'C',
    },    
    {
      id: 14,
      title: 'D',
    },    
    {
      id: 15,
      title: 'E',
    },    
    {
      id: 16,
      title: 'F',
    },
  ];

  constructor() {}

  public logGroupCheckEvent(items: CheckableItem[]): void {
    console.log(items, 'only checked items: ',  items.filter((item: CheckableItem) => item.checked));
  }

}

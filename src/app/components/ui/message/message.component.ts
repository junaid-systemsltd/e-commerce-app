import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Variant } from 'src/types/bootstrap.types';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent implements OnChanges {
  @Input() variant: Variant = 'info';

  variantClass: string;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.variantClass = `alert-${this.variant}`;
  }
}

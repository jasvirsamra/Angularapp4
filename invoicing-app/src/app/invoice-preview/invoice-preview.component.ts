import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
})
export class InvoicePreviewComponent implements OnInit {
  @Input() invoice!: Invoice;

  ngOnInit(): void {}
}

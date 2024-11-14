import { Component } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice, InvoiceItem } from '../models/invoice.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
})
export class CreateInvoiceComponent {
  invoice: Invoice = {
    id: 0,
    customerName: '',
    items: [{ description: '', quantity: 1, price: 0, total: 0 }], // Initialize total
    taxRate: 0,
    subtotal: 0,
    taxAmount: 0,
    total: 0,
  };

  constructor(private invoiceService: InvoiceService) {}

  addItem(): void {
    this.invoice.items.push({ description: '', quantity: 1, price: 0, total: 0 });
  }

  calculateItemTotal(item: InvoiceItem): void {
    item.total = item.quantity * item.price; // Calculate total for each item
  }

  calculateTotals(): void {
    this.invoice.subtotal = this.invoice.items.reduce((sum, item) => {
      this.calculateItemTotal(item); // Ensure each item's total is updated
      return sum + (item.total || 0);
    }, 0);

    this.invoice.taxAmount = this.invoiceService.calculateTax(this.invoice.subtotal, this.invoice.taxRate);
    this.invoice.total = this.invoice.subtotal + this.invoice.taxAmount;
  }

  createInvoice(): void {
    this.calculateTotals();
    this.invoiceService.addInvoice(this.invoice);
    alert('Invoice created successfully!');
  }
}

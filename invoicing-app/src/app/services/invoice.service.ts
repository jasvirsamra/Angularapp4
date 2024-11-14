import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice, InvoiceItem } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoices: Invoice[] = [];
  private nextId = 1;

  getInvoices(): Observable<Invoice[]> {
    return of(this.invoices);
  }

  addInvoice(invoice: Invoice): void {
    invoice.id = this.nextId++;
    invoice.subtotal = this.calculateSubtotal(invoice.items);
    invoice.taxAmount = this.calculateTax(invoice.subtotal, invoice.taxRate);
    invoice.total = invoice.subtotal + invoice.taxAmount;
    this.invoices.push(invoice);
  }

  private calculateSubtotal(items: InvoiceItem[]): number {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  private calculateTax(subtotal: number, taxRate: number): number {
    return (subtotal * taxRate) / 100;
  }
}


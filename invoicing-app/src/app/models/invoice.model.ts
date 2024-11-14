export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total?: number;  // Make 'total' optional to avoid initialization errors
}

export interface Invoice {
date: any;
  id: number;
  customerName: string;
  items: InvoiceItem[];
  taxRate: number;
  subtotal: number;
  taxAmount: number;
  total: number;
}

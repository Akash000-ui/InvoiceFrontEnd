import { Component } from '@angular/core';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-add-invoice',
  standalone: false,
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent {
  step: number = 1;

  constructor(private service : InvoiceService) {}

  client = {
    name: '',
    companyName: '',
    billingAddress: '',
    taxId: '',
    email: ''
  };

  invoice = {
    invoiceNumber: null,
    issueDate: '',
    dueDate: '',
    paymentTerms: '',
    status: 'PENDING'
  };

  invoiceItems = [
    { description: '', quantity: 1, unitPrice: 0, discount: 0, tax: 0 }
  ];

  goToStep(n: number) {
    this.step = n;
  }

  addItem() {
    this.invoiceItems.push({ description: '', quantity: 1, unitPrice: 0, discount: 0, tax: 0 });
  }

  removeItem(index: number) {
    this.invoiceItems.splice(index, 1);
  }

  submitInvoice() {
    const requestBody = {
      client: this.client,
      invoice: this.invoice,
      invoiceItems: this.invoiceItems
    };

    console.log('Invoice to submit:', requestBody);
    this.service.createInvoice(requestBody).subscribe({
      next: (response) => {
        console.log('Invoice created successfully:', response);
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating invoice:', error);
      }
    });
  }

  resetForm() {
    this.client = {
      name: '',
      companyName: '',
      billingAddress: '',
      taxId: '',
      email: ''
    };

    this.invoice = {
      invoiceNumber: null,
      issueDate: '',
      dueDate: '',
      paymentTerms: '',
      status: 'PENDING'
    };

    this.invoiceItems = [
      { description: '', quantity: 1, unitPrice: 0, discount: 0, tax: 0 }
    ];

    this.step = 1;
  }
}

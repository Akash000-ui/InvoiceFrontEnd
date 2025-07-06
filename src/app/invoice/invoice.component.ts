import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice',
  standalone: false,
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoice: any;
  isDarkMode: boolean = false;

  constructor(
    private service: InvoiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const invoiceId = this.route.snapshot.paramMap.get('id');
    if (invoiceId) {
      this.service.getInvoiceById(+invoiceId).subscribe(
        (response: any) => {
          this.invoice = response;
        },
        (error: any) => {
          alert("Error fetching invoice. Please try again later.");
        }
      );
    } else {
      alert("Invalid invoice ID.");
    }

    
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';
    this.applyBodyDarkClass();
  }

  downloadInvoice() {
    const invoiceId = this.invoice?.id;
    if (!invoiceId) {
      alert("Invoice ID is missing");
      return;
    }

    this.service.downloadInvoice(invoiceId).subscribe(
      (pdfBlob) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice_${invoiceId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        alert("Failed to download invoice.");
      }
    );
  }

  toggleDarkMode(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isDarkMode = target.checked;
    localStorage.setItem('darkMode', String(this.isDarkMode));
    this.applyBodyDarkClass();
  }

  private applyBodyDarkClass() {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }
}

import { Component } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  standalone: false,
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent {
    constructor(private service : InvoiceService , private router : Router) {}

  invoices: any[] = [];
  selectedStatus: string = '';
  startDate: string = '';
  endDate: string = '';

  isDarkMode = false;

 toggleDarkMode(event: any): void {
    this.isDarkMode = event.target.checked;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  ngOnInit() {
    this.service.getInvoices().subscribe(
      (response: any) =>{
        console.log("Response INVOICES from the server: ", response);
        this.invoices = response;
      },
       (error: any) => {
        console.error("Error fetching invoices: ", error);
        alert("Error fetching invoices. Please try again later.");
      }
    )
  }

  viewInvoice(id: number) {
    this.router.navigate(['/home/invoice', id]);
  }

  changeStatus(id: number) {
    this.service.changeStatus(id , 'PAID').subscribe(
      (response: any) => {
        console.log("Status changed successfully: ", response);
        // Refresh the invoice list after changing status
        this.ngOnInit();
      },
      (error: any) => {
        console.error("Error changing status: ", error);
        alert("Error changing status. Please try again later.");
      }
    );
  }

   applyStatusFilter() {
    if (this.selectedStatus) {
      this.service.filterByStatus(this.selectedStatus).subscribe(data => {
        this.invoices = data;
      });
    } else {
      this.loadAllInvoices();
    }
  }

  applyDateRangeFilter() {
    if (this.startDate && this.endDate) {
      this.service.filterByDateRange(this.startDate, this.endDate).subscribe(data => {
        this.invoices = data;
      });
    } else {
      alert("Please select both start and end dates.");
    }
  }

  loadAllInvoices() {
    this.service.getInvoices().subscribe(
      (response: any) => {
        this.invoices = response;
      },
      (error: any) => {
        console.error("Error fetching invoices: ", error);
        alert("Error fetching invoices. Please try again later.");
      }
    );
  }

   clearFilters() {
    this.selectedStatus = '';
    this.startDate = '';
    this.endDate = '';
    this.loadAllInvoices();
  }
}

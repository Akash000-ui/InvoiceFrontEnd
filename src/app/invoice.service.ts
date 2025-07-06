import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

 constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/';
  
  login(username: string, password: string) : Observable<any>{
    const body = { username, password };
    return this.http.post(`${this.baseUrl}auth/login`, body);
  }

  getInvoices(): Observable<any> {
    const token = localStorage.getItem('jwt');
    console.log("Token In The Angular"+token);
    return this.http.get(`${this.baseUrl}getAllInvoices`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }     
  );
  }

  getInvoiceById(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.get(`${this.baseUrl}invoiceDetails/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  downloadInvoice(id: number): Observable<Blob> {
    const token = localStorage.getItem('jwt');
    return this.http.get(`${this.baseUrl}invoice/download/${id}`, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  createInvoice(requestBody: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    return this.http.post(`${this.baseUrl}invoice/createFullInvoice`, requestBody, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
changeStatus(id: number, status: string): Observable<any> {
  const token = localStorage.getItem('jwt');
  return this.http.post(
    `${this.baseUrl}updateInvoiceStatus/${id}`,
    { status }, // sending as JSON object
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'  // ✅ Required
      }
    }
  );
}

filterByStatus(status: string): Observable<any[]> {
  const token = localStorage.getItem('jwt');
  return this.http.get<any[]>(`${this.baseUrl}filterInvoicesByStatus`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: { status }
  });
}

filterByDateRange(startDate: string, endDate: string): Observable<any[]> {
  const token = localStorage.getItem('jwt');
  return this.http.get<any[]>(`${this.baseUrl}filterInvoices_ByRange`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: { startDate, endDate }
  });
}

}

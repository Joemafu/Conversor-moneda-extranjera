import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  http: HttpClient = inject(HttpClient);
  private primaryApiUrl =
    'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/jpy.min.json';
  private fallbackApiUrl =
    'https://currency-api.pages.dev/v1/currencies/jpy.min.json';
  private dolarMepApiUrl =
    'https://dolarapi.com/v1/dolares/bolsa';

  constructor() { }

  /**
   * Obtiene los valores de USD desde la API principal y los valores de ARS desde la API del dólar MEP.
   * @returns Un Observable con los valores de USD y ARS.
   */
  getCurrencyValues(): Observable<{ USD: number; ARS: number }> {
    return forkJoin({
      USD: this.fetchUSDFromApi(this.primaryApiUrl).pipe(
        catchError(() => this.fetchUSDFromApi(this.fallbackApiUrl))
      ),
      ARS: this.fetchARSFromMepApi()
    });
  }

  /**
   * Obtiene el valor del USD desde la API de moneda.
   * @param url La URL de la API a consultar.
   * @returns Un Observable con el valor en USD.
   */
  private fetchUSDFromApi(url: string): Observable<number> {
    return this.http.get<{ [key: string]: any }>(url).pipe(
      map((data) => {
        const usd = data['jpy']?.['usd'];
        if (usd !== undefined) {
          return usd;
        } else {
          throw new Error('No se encontró el valor USD en la respuesta de la API.');
        }
      })
    );
  }

  /**
   * Obtiene el valor de ARS desde la API del dólar MEP.
   * @returns Un Observable con el valor en ARS.
   */
  private fetchARSFromMepApi(): Observable<number> {
    return this.http.get<{ [key: string]: any }>(this.dolarMepApiUrl).pipe(
      map((data) => {
        const ars = data['venta'];
        if (ars !== undefined) {
          return ars;
        } else {
          throw new Error('No se encontró el valor de venta en la respuesta de la API del dólar MEP.');
        }
      })
    );
  }
}
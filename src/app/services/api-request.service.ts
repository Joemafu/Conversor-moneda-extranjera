import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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

  constructor() { }

  /**
   * Obtiene los valores de USD y ARS desde el JSON de la API principal, y si falla, reintenta con la API secundaria.
   * @returns Un Observable con los valores de USD y ARS.
   */
  getCurrencyValues(): Observable<{ USD: number; ARS: number }> {
    return this.fetchFromApi(this.primaryApiUrl).pipe(
      catchError((error) => {
        console.warn('Fallo la API primaria, intentando con la secundaria:', error);
        return this.fetchFromApi(this.fallbackApiUrl);
      })
    );
  }

  /**
   * Realiza la consulta a la API proporcionada.
   * @param url La URL de la API a consultar.
   * @returns Un Observable con los valores de USD y ARS.
   */
  private fetchFromApi(url: string): Observable<{ USD: number; ARS: number }> {
    return this.http.get<{ [key: string]: any }>(url).pipe(
      // El operador 'map' se usa para transformar los datos del Observable
      map((data) => {
        // Accede a los valores de 'USD' y 'ARS' dentro de 'data.jpy'
        const usd = data['jpy']?.['usd'];
        const ars = data['jpy']?.['ars'];

        // Verifica que ambos valores existan antes de devolverlos
        if (usd !== undefined && ars !== undefined) {
          return { USD: usd, ARS: ars };
        } else {
          // Si no se encuentran los valores necesarios, lanza un error
          throw new Error('No se encontraron valores USD o ARS en la respuesta de la API.');
        }
      }),
      // Aquí manejamos el error si ocurre en la petición HTTP o en la transformación
      catchError((error) => {
        console.error('Error durante la consulta a la API:', error);
        return throwError(() => new Error('Hubo un problema al obtener los valores de la API.'));
      })
    );
  }

}

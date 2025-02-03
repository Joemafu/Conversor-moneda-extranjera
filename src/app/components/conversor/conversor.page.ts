import { Component, OnInit, inject } from '@angular/core';
import {  IonContent, IonCardContent, IonCardHeader, IonCardTitle, IonCard } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-conversor',
  templateUrl: 'conversor.page.html',
  styleUrls: ['conversor.page.scss'],
  standalone: true,
  imports: [ IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonContent, FormsModule, CommonModule, ReactiveFormsModule],
})
export class ConversorPage implements OnInit {

  private apiRequester = inject(ApiRequestService);
  currencyValues: { USD: number; ARS: number } | null = null;
  conversionADolar: string | null = null;
  conversionAPeso: string | null = null;
  input: number = 100;
  error: string | null = null;

  ngOnInit(): void {
  }

  convert(event : any): void {

    this.input = event.target.value;

    this.fetchValues();



    if (this.error == null) {

      setTimeout(() => {
        console.log('currencyValues disponibles:', this.currencyValues);

        if (this.currencyValues) {
          this.conversionADolar = (this.input * Number(this.currencyValues.USD)).toFixed(2);
          this.conversionAPeso = (this.input * Number(this.currencyValues.ARS)).toFixed(2);


        } else {
          console.warn('currencyValues aún no se han obtenido.');
        }
      }, 50);
    } else {
      console.warn('Se detectó un error:', this.error);
    }
  }

  fetchValues(): void {
    this.apiRequester.getCurrencyValues().subscribe({
      next: (values) => {
        this.currencyValues = values;
        this.error = null;
      },
      error: (err) => {
        console.error('Error al consultar ambas APIs:', err);
        this.error = 'No se pudieron obtener los valores de las APIs.';
      },
    });
  }  
}
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
  errorMessage: string = '';

  ngOnInit(): void {
  }

  convert(event : any): void {

    this.input = event.target.value;

    this.fetchValues();



    if (this.error == null) {

      setTimeout(() => {
        console.log('Valores disponibles:', this.currencyValues);

        if (this.currencyValues) {
          this.conversionADolar = (this.input * Number(this.currencyValues.USD)).toFixed(2);
          this.conversionAPeso = (this.input * Number(this.currencyValues.ARS) * 1.141057648660917 ).toFixed(2);


        } else {
          this.errorMessage = 'No se pudieron obtener los valores de las APIs.';
        }
      }, 50);
    } else {
      this.errorMessage = 'No se pudieron obtener los valores de las APIs.';
    }
  }

  fetchValues(): void {
    this.apiRequester.getCurrencyValues().subscribe({
      next: (values) => {
        this.currencyValues = values;
        this.error = null;
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron obtener los valores de las APIs.';
      },
    });
  }  
}
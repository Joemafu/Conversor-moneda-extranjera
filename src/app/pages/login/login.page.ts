import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonInput, IonButton, IonLabel, IonItem, IonIcon } from '@ionic/angular/standalone';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, IonLabel, IonButton, IonInput, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, /* RouterModule, */ RouterLink]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

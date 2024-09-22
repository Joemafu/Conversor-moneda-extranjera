import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonList, IonItem, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonIcon } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../models/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonIcon, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonItem, IonList, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, CommonModule, ReactiveFormsModule],
})
export class Tab1Page implements OnInit {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  usuario: string = '';
  public subscription: Subscription = new Subscription();

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          mail: user.email!,
          pass: "",
          nombre: "", 
          apellido: "",
        });
        this.usuario = user.email!;        
      } else {
        this.usuario="";
        this.authService.currentUserSig.set(null);    
      }
    });
  }
}
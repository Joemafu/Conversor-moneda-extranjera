import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonList, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonItem, IonList, IonInput, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, FormsModule, CommonModule, ReactiveFormsModule],
})
export class Tab1Page implements OnInit {

  protected mail: string = "";
  protected pass: string ="";
  protected alert: string = "";
  fb: FormBuilder = inject(FormBuilder);
  loginForm: FormGroup;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  pista: string = "Pista: Usuario - admin@correo.com";
  pistaDos: string = "Contraseña - PassWord123";

  constructor() {
    const minLength = Validators.minLength(6);
    const required = Validators.required;
    const correo = Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

    this.loginForm = this.fb.group({
      mail: ['', [required, minLength, correo]],
      pass: ['', [required, minLength]],
    });
  }

  ngOnInit(): void {}

  async login()
  {
    if (this.loginForm.valid) {
      const usuario: Usuario = this.loginForm.value;
      this.authService.login(usuario.mail, usuario.pass)
    .then(alert => {
      
      this.loginForm.reset();
      this.alert = alert;
      this.mail = "";
      this.pass = "";
      if (alert === '') {
        //console.log('login.component - buttonEntrar()', usuario);
        //console.log("Login exitoso");
        //this.router.navigateByUrl('/inventario');
        this.alert = "Login EXITOSO";
      }
    }).catch(error => {
      console.error('login.component - login()', error);
    });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}

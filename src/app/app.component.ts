import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CommonModule],
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isSplashVisible = true;

  //router : Router = inject(Router);
  //platform : Platform = inject(Platform);
  
  constructor() {}

  ngOnInit() {
    // Simular una carga de 3 segundos
    setTimeout(() => {
      this.isSplashVisible = false;
    }, 3000); // 3 segundos
  }
}

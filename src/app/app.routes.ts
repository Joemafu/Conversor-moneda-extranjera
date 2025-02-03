import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'conversor',
        loadComponent: () => import('./components/conversor/conversor.page').then((m) => m.ConversorPage),
  },
  {
    path: '',
    redirectTo: '/conversor',
    pathMatch: 'full',
  },
];

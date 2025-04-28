import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'add-car',
    loadComponent: () =>
      import('./pages/add-car/add-car.component').then((m) => m.AddCarComponent),
  },
  {
    path: 'manage-jobs',
    loadComponent: () =>
      import('./pages/manage-jobs/manage-jobs.component').then((m) => m.ManageJobsComponent),
  },
];


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      {
        path: 'picture',
        loadChildren: () => import('./picture/picture.module').then( m => m.PicturePageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'email',
        loadChildren: () => import('./email/email.module').then( m => m.EmailPageModule)
      },
      {
        path: 'password',
        loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
      },
      {
        path: '',
        redirectTo: '/settings/picture',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}

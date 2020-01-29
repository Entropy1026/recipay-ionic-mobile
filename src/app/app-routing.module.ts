import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./client/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./client/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./client/pages/sidemenu/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./client/pages/sidemenu/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./client/pages/sidemenu/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./client/pages/sidemenu/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'carrier',
    loadChildren: () => import('./carrier/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'carrier/notification',
    loadChildren: () => import('./carrier/pages/sidemenu/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'carrier/settings',
    loadChildren: () => import('./carrier/pages/sidemenu/settings/settings.module').then( m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

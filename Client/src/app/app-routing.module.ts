import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Головна' } },
  { path: 'test-error', component: TestErrorComponent, data: { breadcrumb: 'Тестова помилка' } },
  { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Помилка на сервері' } },
  { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Не знайтено ресурс' } },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule),
    data: { breadcrumb: 'Магазин' }
  },
  {
    path: 'basket',
    loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule),
    data: { breadcrumb: 'Кошик' }
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule),
    data: { breadcrumb: 'Покупка' }
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
    data: { breadcrumb: { skip: true } }
  },
  { path: 'contacts', component: ContactsComponent, data: { breadcrumb: 'Контакти' } },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule),
    data: { breadcrumb: 'Замовлення' }
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

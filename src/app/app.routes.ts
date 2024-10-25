import { Routes } from '@angular/router';
import { PaginaShoesComponent } from './components/pagina-shoes/pagina-shoes.component';

export const routes: Routes = [

    { path: 'pagecommerce', component: PaginaShoesComponent},
    { path: '', redirectTo: '/pagecommerce', pathMatch: 'full' },
    { path: '**', redirectTo: '/pagecommerce' } 
];

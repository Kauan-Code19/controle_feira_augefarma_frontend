import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { MappingComponent } from './features/mapping/mapping.component';
import { PharmacyRepresentativeComponent } from './features/register/pharmacy-representative/pharmacy-representative.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'mapping', component: MappingComponent},
    { path: 'register/pharmacy-representative', component: PharmacyRepresentativeComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
    
];

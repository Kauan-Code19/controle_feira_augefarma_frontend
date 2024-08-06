import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { MappingComponent } from './features/mapping/mapping.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'mapping', component: MappingComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
    
];

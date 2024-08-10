import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { MappingComponent } from './features/mapping/mapping.component';
import { LaboratoryMemberComponent } from './features/register/laboratory-member/laboratory-member.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'mapping', component: MappingComponent},
    { path: 'register/laboratory-member', component: LaboratoryMemberComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
    
];

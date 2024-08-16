import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { MappingComponent } from './features/mapping/mapping.component';
import { LaboratoryMemberComponent } from './features/register/laboratory-member/laboratory-member.component';
import { PharmacyRepresentativeComponent } from './features/register/pharmacy-representative/pharmacy-representative.component';
import { LaboratoryComponent } from './features/register/laboratory/laboratory.component';
import { BadgePharmacyRepresentativeComponent } from './features/badge/badge-pharmacy-representative/badge-pharmacy-representative.component';
import { BadgeLaboratoryMemberComponent } from './features/badge/badge-laboratory-member/badge-laboratory-member.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'mapping', component: MappingComponent},
    { path: 'register/laboratory-member', component: LaboratoryMemberComponent},
    { path: 'register/laboratory', component: LaboratoryComponent},
    { path: 'register/pharmacy-representative', component: PharmacyRepresentativeComponent},
    { path: 'generate-badge/pharmacy-representative', component: BadgePharmacyRepresentativeComponent},
    { path: 'generate-badge/laboratory-member', component: BadgeLaboratoryMemberComponent},
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
    
];

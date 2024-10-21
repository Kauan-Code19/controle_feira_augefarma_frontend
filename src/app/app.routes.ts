import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'mapping', loadComponent: () =>
        import("./features/mapping/mapping.component").then((promise) => promise.MappingComponent),
        canActivate: [authGuard]
    },
    { path: 'register/laboratory-member', loadComponent: () =>
        import("./features/register/laboratory-member/laboratory-member.component")
        .then((promise) => promise.LaboratoryMemberComponent),
        canActivate: [authGuard]
    },
    { path: 'register/laboratory', loadComponent: () =>
        import("./features/register/laboratory/laboratory.component").then((promise) => promise.LaboratoryComponent)
    },
    { path: 'register/pharmacy-representative', loadComponent: () =>
        import("./features/register/pharmacy-representative/pharmacy-representative.component").then((promise) =>
        promise.PharmacyRepresentativeComponent),
        canActivate: [authGuard]
    },
    { path: 'delete', loadComponent: () =>
        import("./features/delete/delete.component").then((promise) => promise.DeleteComponent),
        canActivate: [authGuard]
    },
    { path: 'generate-badge/pharmacy-representative', loadComponent: () =>
        import("./features/badge/badge-pharmacy-representative/badge-pharmacy-representative.component")
        .then((promise) => promise.BadgePharmacyRepresentativeComponent),
        canActivate: [authGuard]
    },
    { path: 'generate-badge/laboratory-member', loadComponent: () =>
        import("./features/badge/badge-laboratory-member/badge-laboratory-member.component").then((promise) =>
        promise.BadgeLaboratoryMemberComponent),
        canActivate: [authGuard]
    },
    { path: 'checking/:segment', loadComponent: () =>
        import("./features/checking/checking.component").then((promise) => promise.CheckingComponent),
        canActivate: [authGuard]
    },
    { path: '',   redirectTo: '/login', pathMatch: 'full' }
    
];

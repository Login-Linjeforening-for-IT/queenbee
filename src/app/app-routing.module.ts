import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { EventsComponent } from "./pages/events/events.component";
import { JobadsComponent } from "./pages/jobads/jobads.component";
import { OrganizationsComponent } from "./pages/organizations/organizations.component";
import { LocationsComponent } from "./pages/locations/locations.component";
import { RulesComponent } from "./pages/rules/rules.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { EventNewComponent } from "./pages/event/event-new/event-new.component";
import { EventEditComponent } from "./pages/event/event-edit/event-edit.component";
import { JobadNewComponent } from "./pages/jobad/jobad-new/jobad-new.component";
import { JobadEditComponent } from "./pages/jobad/jobad-edit/jobad-edit.component";
import { EventCopyComponent } from "./pages/event/event-copy/event-copy.component";
import { JobadCopyComponent } from "./pages/jobad/jobad-copy/jobad-copy.component";
import {LocationNewComponent } from "./pages/location/location-new/location-new.component";
import { RuleNewComponent} from "./pages/rule/rule-new/rule-new.component";
import { RuleCopyComponent } from "./pages/rule/rule-copy/rule-copy.component";
import { RuleEditComponent } from "./pages/rule/rule-edit/rule-edit.component";
import { OrgNewComponent } from "./pages/organization/org-new/org-new.component";
import { OrgEditComponent } from "./pages/organization/org-edit/org-edit.component";
import { LocationEditComponent } from "./pages/location/location-edit/location-edit.component";
import { LoginComponent } from "./pages/login/login.component";
import { LogoutComponent } from "./pages/logout/logout.component";
import { authGuard } from "./services/guard/auth.guard";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path: 'events', component: EventsComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'events/new', component: EventNewComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'events/edit/:id', component: EventEditComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'events/copy/:id', component: EventCopyComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'jobs', component: JobadsComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'jobs/new', component: JobadNewComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'jobs/edit/:id', component: JobadEditComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'jobs/copy/:id', component: JobadCopyComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'organizations', component: OrganizationsComponent, canActivate: [authGuard]},
    { path: 'organizations/new', component: OrgNewComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'organizations/edit/:id', component: OrgEditComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'locations', component: LocationsComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'locations/new', component: LocationNewComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'locations/edit/:id', component: LocationEditComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'rules', component: RulesComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'rules/new', component: RuleNewComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'rules/edit/:id', component: RuleEditComponent, pathMatch: 'full', canActivate: [authGuard]},
    { path: 'rules/copy/:id', component: RuleCopyComponent, pathMatch: 'full', canActivate: [authGuard]},
    // ** detects all other routes, IMPORTANT that its last
    { path: '**', component: PageNotFoundComponent, canActivate: [authGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
export const routingComponents = [DashboardComponent, EventsComponent, JobadsComponent, OrganizationsComponent, LocationsComponent, RulesComponent, PageNotFoundComponent]

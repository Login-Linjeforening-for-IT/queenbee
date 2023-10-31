import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {EventsComponent} from "./pages/events/events.component";
import {JobadsComponent} from "./pages/jobads/jobads.component";
import {OrganizationsComponent} from "./pages/organizations/organizations.component";
import {LocationsComponent} from "./pages/locations/locations.component";
import {RulesComponent} from "./pages/rules/rules.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import { EventNewComponent } from "./pages/event/event-new/event-new.component";
import { EventEditComponent } from "./pages/event/event-edit/event-edit.component";
import { JobadNewComponent } from "./pages/jobad/jobad-new/jobad-new.component";
import { JobadEditComponent } from "./pages/jobad/jobad-edit/jobad-edit.component";
import { EventCopyComponent } from "./pages/event/event-copy/event-copy.component";
import { JobadCopyComponent } from "./pages/jobad/jobad-copy/jobad-copy.component";
import {LocationNewComponent} from "./pages/location/location-new/location-new.component";
import { RuleNewComponent} from "./pages/rule/rule-new/rule-new.component";
import { RuleCopyComponent } from "./pages/rule/rule-copy/rule-copy.component";
import { RuleEditComponent } from "./pages/rule/rule-edit/rule-edit.component";
import { OrgNewComponent } from "./pages/organization/org-new/org-new.component";
import { OrgEditComponent } from "./pages/organization/org-edit/org-edit.component";
import { LocationEditComponent } from "./pages/location/location-edit/location-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'events', component: EventsComponent, pathMatch: 'full'},
  { path: 'events/new', component: EventNewComponent, pathMatch: 'full'},
  { path: 'events/edit/:id', component: EventEditComponent, pathMatch: 'full'},
  { path: 'events/copy/:id', component: EventCopyComponent, pathMatch: 'full'},
  { path: 'jobs', component: JobadsComponent, pathMatch: 'full'},
  { path: 'jobs/new', component: JobadNewComponent, pathMatch: 'full'},
  { path: 'jobs/edit/:id', component: JobadEditComponent, pathMatch: 'full'},
  { path: 'jobs/copy/:id', component: JobadCopyComponent, pathMatch: 'full'},
  { path: 'organizations', component: OrganizationsComponent},
  { path: 'organizations/new', component: OrgNewComponent, pathMatch: 'full'},
  { path: 'organizations/edit/:id', component: OrgEditComponent, pathMatch: 'full'},
  { path: 'locations', component: LocationsComponent, pathMatch: 'full'},
  { path: 'locations/new', component: LocationNewComponent, pathMatch: 'full'},
  { path: 'locations/edit/:id', component: LocationEditComponent, pathMatch: 'full'},
  { path: 'rules', component: RulesComponent, pathMatch: 'full'},
  { path: 'rules/new', component: RuleNewComponent, pathMatch: 'full'},
  { path: 'rules/edit/:id', component: RuleEditComponent, pathMatch: 'full'},
  { path: 'rules/copy/:id', component: RuleCopyComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent} // ** detects all other routes, IMPORTANT that its last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
export const routingComponents = [DashboardComponent, EventsComponent, JobadsComponent, OrganizationsComponent, LocationsComponent, RulesComponent, PageNotFoundComponent]

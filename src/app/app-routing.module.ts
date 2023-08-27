import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {EventsComponent} from "./pages/events/events.component";
import {JobadsComponent} from "./pages/jobads/jobads.component";
import {OrganizationsComponent} from "./pages/organizations/organizations.component";
import {LocationsComponent} from "./pages/locations/locations.component";
import {RulesComponent} from "./pages/rules/rules.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {OrganizationComponent} from "./pages/organization/organization.component";
import {LocationComponent} from "./pages/location/location.component";
import { EventNewComponent } from "./pages/event/event-new/event-new.component";
import { EventEditComponent } from "./pages/event/event-edit/event-edit.component";
import { JobadNewComponent } from "./pages/jobad/jobad-new/jobad-new.component";
import { JobadEditComponent } from "./pages/jobad/jobad-edit/jobad-edit.component";
import { EventCopyComponent } from "./pages/event/event-copy/event-copy.component";
import { JobadCopyComponent } from "./pages/jobad/jobad-copy/jobad-copy.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'events', component: EventsComponent, pathMatch: 'full'},
  { path: 'events/new', component: EventNewComponent, pathMatch: 'full'},
  { path: 'events/edit/:id', component: EventEditComponent, pathMatch: 'full'},
  { path: 'events/copy/:id', component: EventCopyComponent, pathMatch: 'full'},
  { path: 'job-ads', component: JobadsComponent, pathMatch: 'full'},
  { path: 'job-ads/new', component: JobadNewComponent, pathMatch: 'full'},
  { path: 'job-ads/edit/:id', component: JobadEditComponent, pathMatch: 'full'},
  { path: 'job-ads/copy/:id', component: JobadCopyComponent, pathMatch: 'full'},
  { path: 'organizations', component: OrganizationsComponent},
  { path: 'organizations/new', component: OrganizationComponent, pathMatch: 'full'},
  { path: 'organizations/edit/:id', component: OrganizationComponent, pathMatch: 'full'},
  { path: 'locations', component: LocationsComponent},
  { path: 'locations/new', component: LocationComponent},
  { path: 'locations/edit/:id', component: LocationComponent},
  { path: 'rules', component: RulesComponent},
  { path: '**', component: PageNotFoundComponent} // ** detects all other routes, IMPORTANT that its last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
export const routingComponents = [DashboardComponent, EventsComponent, JobadsComponent, OrganizationsComponent, LocationsComponent, RulesComponent, PageNotFoundComponent]

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableEventComponent } from './pages/events/data-table-event/data-table-event.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import { DatetimeComponent } from './components/datetime/datetime.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import {MatMenuModule} from "@angular/material/menu";
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { DataTableOrganizationComponent } from "./pages/organizations/data-table-organization/data-table-organization.component";
import { OrganizationComponent } from './pages/organization/organization.component';
import { LocationComponent } from './pages/location/location.component';
import { DataTableLocationComponent } from './pages/locations/data-table-location/data-table-location.component';
import { DataTableJobadsComponent } from './pages/jobads/data-table-jobads/data-table-jobads.component';
import { JobadComponent } from './pages/jobad/jobad.component';
import { MarkdownTextfieldComponent } from './components/markdown-textfield/markdown-textfield.component';

// 3rd party libraries
import { MarkdownModule } from 'ngx-markdown';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { DotMenuComponent } from './components/dot-menu/dot-menu.component';
import { ErrorComponent } from './components/dialog/error/error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './components/dialog/confirm/confirm.component';
import { EventNewComponent } from './pages/event/event-new/event-new.component';
import { EventFormComponent } from './pages/event/event-form/event-form.component';
import { EventEditComponent } from './pages/event/event-edit/event-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DataTableEventComponent,
    PageNotFoundComponent,
    SidebarComponent,
    DatetimeComponent,
    OrganizationsComponent,
    DataTableOrganizationComponent,
    OrganizationComponent,
    LocationComponent,
    DataTableJobadsComponent,
    DataTableLocationComponent,
    JobadComponent,
    MarkdownTextfieldComponent,
    DotMenuComponent,
    ErrorComponent,
    ConfirmComponent,
    EventNewComponent,
    EventFormComponent,
    EventEditComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatMenuModule,
        MarkdownModule.forRoot(),
        PickerComponent,
        MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

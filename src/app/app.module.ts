import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatChipsModule} from "@angular/material/chips";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import { DatetimeComponent } from './components/datetime/datetime.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import {MatMenuModule} from "@angular/material/menu";
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { DataTableOrganizationComponent } from "./pages/organizations/data-table-organization/data-table-organization.component";
import { DataTableAddressComponent } from './pages/locations/data-table-address/data-table-address.component';
import { DataTableJobadsComponent } from './pages/jobads/data-table-jobads/data-table-jobads.component';
import { MarkdownTextfieldComponent } from './components/markdown-textfield/markdown-textfield.component';

// 3rd party libraries
import { MARKED_OPTIONS, MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { DotMenuComponent } from './components/dot-menu/dot-menu.component';
import { ErrorComponent } from './components/dialog/error/error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './components/dialog/confirm/confirm.component';
import { EventNewComponent } from './pages/event/event-new/event-new.component';
import { EventFormComponent } from './pages/event/event-form/event-form.component';
import { EventEditComponent } from './pages/event/event-edit/event-edit.component';
import { JobadCopyComponent } from './pages/jobad/jobad-copy/jobad-copy.component';
import { JobadEditComponent } from './pages/jobad/jobad-edit/jobad-edit.component';
import { JobadFormComponent } from './pages/jobad/jobad-form/jobad-form.component';
import { JobadNewComponent } from './pages/jobad/jobad-new/jobad-new.component';
import { EventCopyComponent } from './pages/event/event-copy/event-copy.component';
import { AlertComponent } from './components/alert/alert.component';
import { LocationNewComponent } from './pages/location/location-new/location-new.component';
import { LocationFormComponent } from './pages/location/location-form/location-form.component';
import { MapComponent } from './components/map/map.component';
import { MazemapComponent } from './components/mazemap/mazemap.component';
import { DataTableMazemapComponent } from './pages/locations/data-table-mazemap/data-table-mazemap.component';
import { DataTableCoordsComponent } from './pages/locations/data-table-coords/data-table-coords.component';
import { DataTableRulesComponent } from './pages/rules/data-table-rules/data-table-rules.component';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { ImageCropperModule } from './components/image-cropper/image-cropper.module';
import { CropComponent } from './components/dialog/crop/crop.component';
import { RuleNewComponent } from './pages/rule/rule-new/rule-new.component';
import { RuleFormComponent } from './pages/rule/rule-form/rule-form.component';
import { AudienceSelectorComponent } from './components/chip-selectors/audience-selector/audience-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { RuleEditComponent } from './pages/rule/rule-edit/rule-edit.component';
import { RuleCopyComponent } from './pages/rule/rule-copy/rule-copy.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrgFormComponent } from './pages/organization/org-form/org-form.component';
import { OrgNewComponent } from './pages/organization/org-new/org-new.component';
import { OrgEditComponent } from './pages/organization/org-edit/org-edit.component';
import { LocationEditComponent } from './pages/location/location-edit/location-edit.component';
import { InputSelectorComponent } from './components/chip-selectors/input-selector/input-selector.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { NavBtnComponent } from './layout/nav-btn/nav-btn.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import { ImageManagerComponent } from './components/dialog/image-manager/image-manager.component';
import { LoginComponent } from './pages/login/login.component';

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
    DataTableJobadsComponent,
    DataTableAddressComponent,
    DataTableMazemapComponent,
    DataTableCoordsComponent,
    DataTableRulesComponent,
    MarkdownTextfieldComponent,
    DotMenuComponent,
    ErrorComponent,
    ConfirmComponent,
    EventNewComponent,
    EventFormComponent,
    EventEditComponent,
    JobadFormComponent,
    JobadNewComponent,
    JobadCopyComponent,
    JobadEditComponent,
    EventCopyComponent,
    AlertComponent,
    LocationNewComponent,
    LocationFormComponent,
    MapComponent,
    MazemapComponent,
    ImageSelectorComponent,
    CropComponent,
    RuleNewComponent,
    RuleFormComponent,
    AudienceSelectorComponent,
    RuleEditComponent,
    RuleCopyComponent,
    OrgFormComponent,
    OrgNewComponent,
    OrgEditComponent,
    LocationEditComponent,
    InputSelectorComponent,
    TopbarComponent,
    NavBtnComponent,
    ImageManagerComponent,
    LoginComponent
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
        MatRadioModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatMenuModule,
        MarkdownModule.forRoot({
          markedOptions: {
            provide: MARKED_OPTIONS,
            useValue: {
              mangle: false,
              headerIds: false,
            },
          },
        }),
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        PickerComponent,
        MatDialogModule,
        MatAutocompleteModule,
        ImageCropperModule,
        MatIconModule,
        MatSnackBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

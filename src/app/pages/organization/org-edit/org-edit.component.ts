import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { convertFromRFC3339 } from 'src/app/utils/time';
import { OrganizationService } from 'src/app/services/admin-api/organizations.service';
import { OrgFormComponent } from '../org-form/org-form.component';
import { Organization } from 'src/app/models/dataInterfaces.model';
import { BeehiveAPI } from 'src/app/config/constants';
import { scrollToTop } from 'src/app/utils/core';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';

@Component({
  selector: 'app-org-edit',
  templateUrl: './org-edit.component.html'
})
export class OrgEditComponent {
  @ViewChild(OrgFormComponent) orgFormComponent!: OrgFormComponent;
  orgFormValues!: Organization;

  shortname!: string;
  org!: Organization;
  timeUpdated!: string;

  constructor(
    private orgService: OrganizationService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    // Get the organization shortname from the URL
    this.route.url.subscribe(segments => {
      if (segments.length >= 3) {
        this.shortname = segments[2].path;
      }
    });

    // Fetch the event
    this.orgService.fetchOrg(this.shortname).subscribe((o: Organization) => {
      this.timeUpdated = convertFromRFC3339(o.updated_at);
      this.org = o;
    })
  }

  updateOrg() {
    const formValues = this.orgFormComponent.getFormValues();
    console.log(formValues)
    //formValues.shortname = this.shortname;

    this.orgService.patchOrg(formValues).subscribe({
      next: () => {
        this.router.navigate([BeehiveAPI.ORGANIZATIONS_PATH]).then((navigated: boolean) => {
          if(navigated) {
            this.snackbarService.openSnackbar("Successfully updated organization", "OK", 2.5)
          }
        });
      },
      error: (error) => {
        scrollToTop();
        console.log("Erroring")
        this.dialog.open(ErrorComponent, {
          data: {
            title: "Error: " + error.status + " " + error.statusText,
            details: error.error.error,
            autoFocus: false
          },
        });

      }
    });
  }
}

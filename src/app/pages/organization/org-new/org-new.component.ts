import { Component, ViewChild } from '@angular/core';
import { OrgFormComponent } from '../org-form/org-form.component';
import { Organization } from 'src/app/models/dataInterfaces.model';
import { OrganizationService } from 'src/app/services/admin-api/organizations.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BeehiveAPI } from 'src/app/config/constants';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';

@Component({
  selector: 'app-org-new',
  templateUrl: './org-new.component.html'
})
export class OrgNewComponent {
  @ViewChild(OrgFormComponent) orgFormComponent!: OrgFormComponent;
  orgFormValues!: Organization;

  constructor(
    private orgService: OrganizationService,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  submitOrg() {
    const formValues = this.orgFormComponent.getFormValues();

    this.orgService.createOrg(formValues).subscribe({
      next: () => {
        this.router.navigate([BeehiveAPI.ORGANIZATIONS_PATH]).then((navigated: boolean) => {
          if(navigated) {
            this.snackbarService.openSnackbar("Successfully created organization", "OK", 2.5)
          }
        });
      },
      error: (error) => {
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

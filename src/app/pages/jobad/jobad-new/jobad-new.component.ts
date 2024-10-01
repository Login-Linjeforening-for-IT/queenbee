import { Component, ViewChild } from '@angular/core';
import { JobadDetail } from "../../../models/dataInterfaces.model";
import { JobadFormComponent } from "../jobad-form/jobad-form.component";
import { JobadService } from "../../../services/admin-api/jobad.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { SnackbarService } from "../../../services/snackbar.service";
import { BeehiveAPI } from '@env';
import { ErrorComponent } from "../../../components/dialog/error/error.component";

@Component({
    selector: 'app-jobad-new',
    templateUrl: './jobad-new.component.html'
})
export class JobadNewComponent {
    @ViewChild(JobadFormComponent) jobadFormComponent!: JobadFormComponent;
    jobadFormValues!: JobadDetail;

    constructor(
        private jobadService: JobadService,
        private dialog: MatDialog,
        private router: Router,
        private snackbarService: SnackbarService
    ) {}

    submitAd() {
        const formValues = this.jobadFormComponent.getFormValues();
        const skills = this.jobadFormComponent.getSkills();
        const cities = this.jobadFormComponent.getCities();

        this.jobadService.createJobad(formValues, skills, cities).subscribe({
            next: () => {
                this.router.navigate([BeehiveAPI.JOBADS_PATH]).then((navigated: boolean) => {
                    if(navigated) {
                        this.snackbarService.openSnackbar("Successfully created jobad", "OK", 2.5)
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

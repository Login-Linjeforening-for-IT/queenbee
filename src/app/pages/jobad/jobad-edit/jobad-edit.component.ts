import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobadDetail } from 'src/app/models/dataInterfaces.model';
import { JobadService } from 'src/app/services/admin-api/jobad.service';
import { convertFromRFC3339 } from 'src/app/utils/time';
import { JobadFormComponent } from '../jobad-form/jobad-form.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BeehiveAPI } from '@env';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';

@Component({
  selector: 'app-jobad-edit',
  templateUrl: './jobad-edit.component.html'
})
export class JobadEditComponent {
  @ViewChild(JobadFormComponent) jobadFormComponent!: JobadFormComponent;
  jobadID!: number;
  jobad!: JobadDetail;
  skills!: string[];
  cities!: string[];
  timeUpdated!: string;

  constructor(
    private jobadService: JobadService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    // Get the jobad ID from the URL
    this.route.url.subscribe(segments => {
      if (segments.length >= 3) {
        this.jobadID = +segments[2].path;
      }
    });

    // Fetch the jobad
    this.jobadService.fetchJobad(this.jobadID).subscribe((j: JobadDetail) => {
      this.timeUpdated = convertFromRFC3339(j.updated_at);
      this.jobad = j;
      this.skills = j.skills;
      this.cities = j.cities;
    })
  }

  updateJobad() {
    const formValues = this.jobadFormComponent.getFormValues();

    this.jobadService.patchJobad(formValues, this.jobadFormComponent.getSkills(), this.jobadFormComponent.getCities()).subscribe({
      next: () => {
        this.router.navigate([BeehiveAPI.JOBADS_PATH]).then((navigated: boolean) => {
          if(navigated) {
            this.snackbarService.openSnackbar("Successfully updated jobad", "OK", 2.5)
          }
        });
      },
      error: (error) => {
        this.dialog.open(ErrorComponent, {
          data: {
            title: "Error: " + error.status + " " + error.statusText,
            details: error,
            autoFocus: false
          },
        });

      }
    });
  }
}

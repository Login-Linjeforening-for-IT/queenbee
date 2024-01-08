import { Component, ViewChild } from '@angular/core';
import { JobadFormComponent } from '../jobad-form/jobad-form.component';
import { JobadDetail } from 'src/app/models/dataInterfaces.model';
import { ActivatedRoute, Router } from '@angular/router';
import { JobadService } from 'src/app/services/admin-api/jobad.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { convertFromRFC3339 } from 'src/app/utils/time';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';
import { BeehiveAPI } from 'src/app/config/constants';

@Component({
  selector: 'app-jobad-copy',
  templateUrl: './jobad-copy.component.html'
})
export class JobadCopyComponent {
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

      j.title_no = '';
      j.title_en = '';
      j.position_title_no = '';
      j.position_title_en = '';


      this.jobad = j;
      this.skills = j.skills;
      this.cities = j.cities;
    })
  }

  createJobad() {
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

import { Component, ViewChild } from '@angular/core';
import { JobadFormComponent } from '../jobad-form/jobad-form.component';
import { JobadDetail } from 'src/app/models/dataInterfaces.model';
import { ActivatedRoute, Router } from '@angular/router';
import { JobadService } from 'src/app/services/admin-api/jobad.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
      this.jobad = j;
      this.skills = j.skills;
      this.cities = j.cities;
    })
  }

  createJobad() {
    const formValues = this.jobadFormComponent.getFormValues();
    console.log(formValues)

    this.jobadService.patchJobad(formValues, this.jobadFormComponent.getSkills(), this.jobadFormComponent.getCities());
  }
}
function convertFromRFC3339(updated_at: string): string {
  throw new Error('Function not implemented.');
}


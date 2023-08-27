import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobadDetail } from 'src/app/models/dataInterfaces.model';
import { JobadService } from 'src/app/services/api/jobad.service';
import { convertFromRFC3339 } from 'src/app/utils/time';

@Component({
  selector: 'app-jobad-edit',
  templateUrl: './jobad-edit.component.html'
})
export class JobadEditComponent {
  jobadID!: number;
  jobad!: JobadDetail;
  timeUpdated!: string;

  constructor(
    private jobadService: JobadService,
    private route: ActivatedRoute
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
      console.log(j)
    })
  }

  updateJobad() {

  }
}

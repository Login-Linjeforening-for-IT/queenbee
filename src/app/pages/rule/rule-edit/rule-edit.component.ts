import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Rule } from 'src/app/models/dataInterfaces.model';
import { RulesService } from 'src/app/services/admin-api/rules.service';
import { convertFromRFC3339 } from 'src/app/utils/time';
import { RuleFormComponent } from '../rule-form/rule-form.component';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';
import { BeehiveAPI } from '@env';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html'
})

/**
 * The 'RuleEditComponent' is used for editing rule objects.
 */
export class RuleEditComponent {
  @ViewChild(RuleFormComponent) ruleFormComponent!: RuleFormComponent;
  eventFormValues!: Rule;

  ruleID!: number;
  rule!: Rule;
  timeUpdated!: string;

  constructor(
    private ruleService: RulesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    // Get the event ID from the URL
    this.route.url.subscribe(segments => {
      if (segments.length >= 3) {
        this.ruleID = +segments[2].path;
      }
    });

    // Fetch the event
    this.ruleService.fetchRule(this.ruleID).subscribe((ru: Rule) => {
      this.timeUpdated = convertFromRFC3339(ru.updated_at);
      this.rule = ru;
    })
  }

  updateRule() {
    const formValues = this.ruleFormComponent.getFormValues();
    formValues.id = this.ruleID;

    this.ruleService.patchRule(formValues).subscribe({
      next: () => {
        console.log("Rule updated successfully");
        this.router.navigate([BeehiveAPI.RULES_PATH]).then((navigated: boolean) => {
          if(navigated) {
            this.snackbarService.openSnackbar("Successfully updated rule", "OK", 2.5)
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

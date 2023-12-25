import { Component, ViewChild } from '@angular/core';
import { Rule } from 'src/app/models/dataInterfaces.model';
import { RuleFormComponent } from '../rule-form/rule-form.component';
import { BeehiveAPI } from 'src/app/config/constants';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';
import { RulesService } from 'src/app/services/admin-api/rules.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-rule-copy',
  templateUrl: './rule-copy.component.html'
})
export class RuleCopyComponent {
  @ViewChild(RuleFormComponent) ruleFormComponent!: RuleFormComponent;
  eventFormValues!: Rule;

  ruleID!: number;
  rule!: Rule;

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
      ru.name_no = '';
      ru.name_en = '';
      this.rule = ru;
    })
  }


    /**
   * Submits a new rule to the server and handles success and error cases.
   */
  submitRule() {
    // Get form values from the user input form and set the rule's ID.
    const formValues = this.ruleFormComponent.getFormValues();
    formValues.id = this.ruleID;

    // Send a POST request to create the rule and subscribe to the response.
    this.ruleService.createRule(formValues).subscribe({
      next: () => {
        // Upon successful rule creation, navigate to the rules page.
        this.router.navigate([BeehiveAPI.RULES_PATH]).then((navigated: boolean) => {
          // Display a success message in a snackbar if navigation is successful.
          if (navigated) {
            this.snackbarService.openSnackbar("Successfully created rule", "OK", 2.5);
          }
        });
      },
      error: (error) => {
        // Display an error message dialog with details on the error.
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

import { Component, ViewChild } from '@angular/core';
import { RuleFormComponent } from '../rule-form/rule-form.component';
import { Rule } from 'src/app/models/dataInterfaces.model';
import { RulesService } from 'src/app/services/admin-api/rules.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BeehiveAPI } from '@env';

@Component({
  selector: 'app-rule-new',
  templateUrl: './rule-new.component.html'
})
export class RuleNewComponent {
  @ViewChild(RuleFormComponent) ruleFormComponent!: RuleFormComponent;
  ruleFormValues!: Rule;

  constructor(
    private ruleService: RulesService,
    private dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  submitRule() {
    const formValues = this.ruleFormComponent.getFormValues();

    this.ruleService.createRule(formValues).subscribe({
      next: () => {
        this.router.navigate([BeehiveAPI.RULES_PATH]).then((navigated: boolean) => {
          if(navigated) {
            this.snackbarService.openSnackbar("Successfully created rule", "OK", 2.5)
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

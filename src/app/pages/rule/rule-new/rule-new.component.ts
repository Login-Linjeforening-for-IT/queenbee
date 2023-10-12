import { Component, ViewChild } from '@angular/core';
import { RuleFormComponent } from '../rule-form/rule-form.component';
import { Rule } from 'src/app/models/dataInterfaces.model';
import { RulesService } from 'src/app/services/admin-api/rules.service';
import { MatDialog } from '@angular/material/dialog';
import { scrollToTop } from 'src/app/utils/core';
import { ErrorComponent } from 'src/app/components/dialog/error/error.component';

@Component({
  selector: 'app-rule-new',
  templateUrl: './rule-new.component.html'
})
export class RuleNewComponent {
  @ViewChild(RuleFormComponent) ruleFormComponent!: RuleFormComponent;
  ruleFormValues!: Rule;

  constructor(
    private ruleService: RulesService,
    private dialog: MatDialog
  ) {}

  submitRule() {
    const formValues = this.ruleFormComponent.getFormValues();

    this.ruleService.createRule(formValues).subscribe({
      next: () => {
        console.log("Rule created successfully");
        // here you could navigate to another page, or show a success message, etc.
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

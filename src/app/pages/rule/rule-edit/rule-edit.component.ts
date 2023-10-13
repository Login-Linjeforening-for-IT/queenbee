import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Rule } from 'src/app/models/dataInterfaces.model';
import { RulesService } from 'src/app/services/admin-api/rules.service';
import { convertFromRFC3339 } from 'src/app/utils/time';

@Component({
  selector: 'app-rule-edit',
  templateUrl: './rule-edit.component.html',
  styleUrls: ['./rule-edit.component.css']
})
export class RuleEditComponent {
  
  ruleID!: number;
  rule!: Rule;
  timeUpdated!: string;

  constructor(
    private ruleService: RulesService,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
      console.log("Hello there", this.rule)
    })
  }

  updateRule() {

  }
}

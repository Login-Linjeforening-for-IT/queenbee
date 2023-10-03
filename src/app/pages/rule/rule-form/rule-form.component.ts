import {Component, Input} from '@angular/core';
import {Rule} from "../../../models/dataInterfaces.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html'
})
export class RuleFormComponent {
  @Input() rule!: Rule;
  ruleForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.ruleForm = this.fb.group({
      name_no: ['', Validators.required],
      name_en: '',
      description_no: '',
      description_en: '',
    })
  }
}

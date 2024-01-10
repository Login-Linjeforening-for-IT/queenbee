import {Component, Input} from '@angular/core';
import {Rule} from "../../../models/dataInterfaces.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html'
})

/**
 * The 'RuleFormComponent' is the form used to manipulate all rules.
 *
 * @example
 * <app-rules-form
 *   [rule]="ruleObject">
 * </app-rules-form>
 */
export class RuleFormComponent {
  @Input() rule!: Rule;
  ruleForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();

    // If a rule is inputed into this component: populate input fields with data
    if(this.rule) {
      this.updateFormFields();
    }
  }

  private initForm() {
    this.ruleForm = this.fb.group({
      name_no: ['', Validators.required],
      name_en: ['', Validators.required],
      description_no: '',
      description_en: '',
    })

    // Subscribe to value changes for a specific form control
    this.ruleForm?.valueChanges.subscribe((value) => {
      console.log('ruleform value changed:', value);
    });
  }

  getFormValues(): Rule {
    return this.ruleForm.value;
  }

  onDescriptionNoChange(newVal: { md: string }) {
    this.ruleForm.get('description_no')?.setValue(newVal.md);
  }

  onDescriptionEnChange(newVal: { md: string }) {
      this.ruleForm.get('description_en')?.setValue(newVal.md);
  }

  private updateFormFields() {
    if(this.rule) {
      this.ruleForm.patchValue({
        name_no: this.rule.name_no || '',
        name_en: this.rule.name_en || '',
        description_no: this.rule.description_no || '',
        description_en: this.rule.description_en || '',
      })
    }
  }
}

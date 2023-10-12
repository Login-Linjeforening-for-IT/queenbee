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

  onDescriptionNoChange(newVal: { ht: string }) {
    this.ruleForm.get('description_no')?.setValue(newVal.ht);
  }

  onDescriptionEnChange(newVal: { ht: string }) {
      this.ruleForm.get('description_en')?.setValue(newVal.ht);
  }
}

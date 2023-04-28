import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent implements OnInit {
  // public myForm = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  formFields = {
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  };

  public myForm = this.formBuilder.group(this.formFields);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset({
      name: 'RTX 3080',
      price: 699,
      inStorage: 5,
    });
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field as keyof typeof this.formFields].errors &&
      this.myForm.controls[field as keyof typeof this.formFields].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field as keyof typeof this.formFields])
      return null;
    const errors =
      this.myForm.controls[field as keyof typeof this.formFields].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field must be longer than ${errors[key].requiredLength} characters`;
        case 'min':
          return `This field must be greater than ${errors[key].min}`;
        default:
          return null;
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    } else {
      console.log(this.myForm.value);
      this.myForm.reset();
    }
  }
}

import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  templateUrl: './dinamic-page.component.html',
  styles: [],
})
export class DinamicPageComponent {
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) {}

  get favoriteGames() {
    return this.form.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }

  isValidFieldInArray(FormArray: FormArray, index: number) {
    return (
      FormArray.controls[index].errors && FormArray.controls[index].touched
    );
  }

  getFieldError(field: string): string | null {
    if (this.form.controls[field]) return null;
    const errors = this.form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `Min length ${errors[key].requiredLength}`;
        case 'pattern':
          return 'The field has invalid characters';
        default:
          return 'Error';
      }
    }
    return null;
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onAddToFavorite(): void {
    if (this.newFavorite.invalid) {
      return;
    }
    // this.favoriteGames.push(new FormControl(this.newFavorite.value, Validators.required));
    this.favoriteGames.push(
      this.fb.control(this.newFavorite.value, Validators.required)
    );
    this.newFavorite.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    (this.form.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.form.reset();
  }
}

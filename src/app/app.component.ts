import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'entwicklerCase';
  personForm!: FormGroup;
  countries: { code: string, name: string }[] = [];
  
  constructor(private formBuilder: FormBuilder) {
    this.createContactForm();
  }

  onSubmit() {
    if (this.personForm.valid) {
      console.log('Formular erfolgreich abgesendet: ' + JSON.stringify(this.personForm.value));
    } else {
      console.log('Bitte überprüfen Sie die Eingabefelder.');
    }}

  createContactForm() {
    this.personForm = this.formBuilder.group({
      anrede: [''],
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      geburtsdatum: ['', [Validators.required, this.pastDateValidator]],
      adresse: [''],
      plz: ['', [Validators.pattern(/^[0-9]{5}$/)]],
      ort: [''],
      land: ['',],
    });
  }

  pastDateValidator(control: any) {
    const today = new Date().toISOString().split('T')[0];
    return control.value < today ? null : { invalidDate: true };
  }
}

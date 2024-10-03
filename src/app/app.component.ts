import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CountryService } from './services/country.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public title = 'Entwickler Case';
  public personForm!: FormGroup;
  public countries: { code: string; name: string }[] = [];
  private countryService = inject(CountryService);
  public salutation = ['Herr', 'Frau', 'Divers'];
  public invalid: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createContactForm();
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  onSubmit() {
    if(!this.personForm.get('plz')?.valid){
      this.personForm.get('plz')?.setValue('');
      this.personForm.get('plz')?.updateValueAndValidity();
    }
    if (this.personForm.valid) {
      console.log(
        'Formular erfolgreich abgesendet: ' +
          JSON.stringify(this.personForm.value)
      );
      this.invalid = false;
    } else {
      console.log('Bitte überprüfen Sie die Eingabefelder.');
      this.invalid = true;
    }
  }
  createContactForm() {
    this.personForm = this.formBuilder.group({
      anrede: [''],
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      geburtsdatum: ['', [Validators.required, this.pastDateValidator]],
      adresse: [''],
      plz: ['', [Validators.pattern(/^[0-9]{5}$/)]],
      ort: [''],
      land: ['', Validators.required],
    });
  }

  pastDateValidator(control: any) {
    const today = new Date().toISOString().split('T')[0];
    return control.value < today ? null : { invalidDate: true };
  }
}

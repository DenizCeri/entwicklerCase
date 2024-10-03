import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  constructor() {}

  getCountries(): Observable<{ code: string; name: string }[]> {
    return this.http
      .get('/assets/countries.csv', { responseType: 'text' })
      .pipe(
        map((data) =>
          data
            .split('\n')
            .filter((line) => line.trim() !== '')
            .map((line) => {
              const [code, name] = line.split(';');
              return { code: code.trim(), name: name.trim() };
            })
        )
      );
  }
}

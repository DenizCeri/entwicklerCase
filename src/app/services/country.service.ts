import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<{ code: string; name: string }[]> {
    return this.http.get('assets/countries.csv', { responseType: 'text' }).pipe(
      map((data) =>
        data.split('\n').map((line) => {
          const [code, name] = line.split(';');
          return { code: code.trim(), name: name.trim() };
        })
      )
    );
  }
}

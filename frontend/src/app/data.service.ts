import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {forkJoin, Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FakeData } from "./model/fakedata";
import { environment } from "../environments/environment";
import {Datamodel} from "./model/datamodel";

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  fakeDataEn: FakeData = {} as FakeData;
  fakeDataEs: FakeData = {} as FakeData;
  fakeDataDe: FakeData = {} as FakeData;

  constructor(private http: HttpClient) {
    http.get<Datamodel>(environment.api + '/data').subscribe(res => {
      this.fakeDataEn = res.us;
      this.fakeDataEs = res.es;
      this.fakeDataDe = res.de;
    });
  }

  ngOnInit() {}

  getFirstName(country: string, index: number) {
    if (country === 'de') {
      return this.fakeDataDe.firstName[index];
    } else if (country === 'es') {
      return this.fakeDataEs.firstName[index];
    } else {
      return this.fakeDataEn.firstName[index];
    }
  }

  getLastName(country: string, index: number) {
    if (country === 'de') {
      return this.fakeDataDe.lastName[index];
    } else if (country === 'es') {
      return this.fakeDataEs.lastName[index];
    } else {
      return this.fakeDataEn.lastName[index];
    }
  }

  getIdNumber(country: string, index: number) {
    if (country === 'de') {
      return this.fakeDataDe.idNumber[index];
    } else if (country === 'es') {
      return this.fakeDataEs.idNumber[index];
    } else {
      return this.fakeDataEn.idNumber[index];
    }
  }

  getAddress(country: string, index: number) {
    if (country === 'de') {
      return this.fakeDataDe.address[index];
    } else if (country === 'es') {
      return this.fakeDataEs.address[index];
    } else {
      return this.fakeDataEn.address[index];
    }
  }

  getPhone(country: string, index: number) {
    if (country === 'de') {
      return this.fakeDataDe.phone[index];
    } else if (country === 'es') {
      return this.fakeDataEs.phone[index];
    } else {
      return this.fakeDataEn.phone[index];
    }
  }

}

import { Injectable } from '@angular/core';
import {DataService} from "./data.service";

declare var require: any;
const Srand = require('seeded-rand');

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  rng = new Srand(10);
  index: number = 1;

  constructor(private data: DataService) { }

  setData(seed: number) {
    this.rng = seed > 0 ? new Srand(seed) : new Srand();
    this.index = 1;
  }

  getRecord(country: string, errorCount: number) {
    let record = this.getRecordByCountry(country);
    this.addErrors(errorCount, record);
    return record;
  }

  getRecordByCountry(country: string) {
    let record = [];
    record.push(this.index++ as unknown as string);
    record.push(this.data.getFirstName(country, this.rng.intInRange(0, 499)) + ' ' + this.data.getLastName(country, this.rng.intInRange(0, 999)));
    record.push(this.data.getIdNumber(country, this.rng.intInRange(0, 699)));
    record.push(this.data.getAddress(country, this.rng.intInRange(0, 699)));
    record.push(this.data.getPhone(country, this.rng.intInRange(0, 699)));
    return record;
  }

  addErrors(errorCount: number, record: string[]) {
    let count = Math.floor(errorCount);
    let probability = errorCount - Math.floor(errorCount);
    this.addErrorsByCount(count, record);
    this.addErrorByProbability(probability, record);
  }

  addErrorByProbability(errorCount: number, record: string[]) {
    if (this.rng.inRange(0, 1) < errorCount) {
      this.makeErrorByInserting(record);
      return;
    }
  }

  addErrorsByCount(errorCount: number, record: string[]) {
    for (let i = 0; i < errorCount; i++) {
      switch (this.rng.intInRange(0, 2)) {
        case 0:
          this.makeErrorByInserting(record);
          break;
        case 1:
          this.makeErrorByRemoving(record);
          break;
        case 2:
          this.makeErrorBySwapping(record);
      }
    }
  }

  makeErrorByInserting(record: string[]) {
    let elemIndex = this.rng.intInRange(1, 4);
    let char = '1234567890qwertyuiopasdfghjklzxcvbnm'.charAt(this.rng.intInRange(0, 35));
    let index = this.rng.intInRange(0, record[elemIndex].length);
    if (record[elemIndex].length < 40) {
      record[elemIndex] = record[elemIndex].slice(0, index) + char + record[elemIndex].slice(index);
    }
  }

  makeErrorByRemoving(record: string[]) {
    let elemIndex = this.rng.intInRange(1, 4);
    let index = this.rng.intInRange(0, record[elemIndex].length);
    if (record[elemIndex].length > 1) {
      record[elemIndex] = record[elemIndex].slice(0, index) + record[elemIndex].slice(index + 1);
    }
  }

  makeErrorBySwapping(record: string[]) {
    let elemIndex = this.rng.intInRange(1, 4);
    let index1 = this.rng.intInRange(0, record[elemIndex].length);
    let index2 = this.rng.intInRange(0, record[elemIndex].length);
    let arr = record[elemIndex].split('');
    let tempChar = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tempChar;
    record[elemIndex] = arr.join('');
  }

}
